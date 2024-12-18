'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Grid, IconButton } from "@mui/material";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { VideoContainer, VideoElement, ControlsOverlay } from '@/components/calls/styles/CallVideo_style';
import { ButtonEndCall } from '@/components/calls/styles/EndCall_style';
import { useSocket } from '@/utils/socket/socket.context';
import CallEndIcon from '@mui/icons-material/CallEnd'
import RejectCall from '@/components/calls/RejectCall';

type Props = {
    data: any;
    isMicOn: boolean;
    setIsMicOn: (isMicOn: boolean) => void;
    isCameraOn: boolean;
    setIsCameraOn: (isCameraOn: boolean) => void;
    setIsCallVideo: (isCallVideo: boolean) => void;
}

function CallVideo({
    data,
    isMicOn, setIsMicOn,
    isCameraOn, setIsCameraOn,
    setIsCallVideo
}: Props) {
    const { socket } = useSocket();
    const { receiver, conversation } = data;

    const [isCall, setIsCall] = useState<boolean>(false);
    const [isCallReject, setIsCallReject] = useState<boolean>(false);

    const [openMic, setOpenMic] = useState<boolean>(isMicOn);
    const [openVideo, setOpenVideo] = useState<boolean>(isCameraOn);
    const [isRemoteMicOn, setIsRemoteMicOn] = useState<boolean>(true);

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const remoteAudioRef = useRef<HTMLAudioElement>(null);
    const peerRef = useRef<RTCPeerConnection | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const toggleMic = () => {
        if (!socket) return;
        setOpenMic((prev) => {
            const isMicOn = !prev;
            // setIsMicOn(isMicOn);

            if (streamRef.current) {
                streamRef.current.getAudioTracks().forEach((track) => { track.enabled = isMicOn; });

                if (socket && receiver) {
                    socket.emit('video-signal', {
                        targetId: receiver._id,
                        type: 'mic-status',
                        isMicOn,
                    });
                }
            }

            return isMicOn;
        });
    };

    const handleVideoToggle = () => {
        if (!socket) return;
        setOpenVideo((prev) => {
            const isCameraOn = !prev;
            // setIsCameraOn(isCameraOn);

            if (localVideoRef.current) {
                localVideoRef.current.style.display = isCameraOn ? 'block' : 'none';
                if (socket && receiver) {
                    socket.emit('video-signal', {
                        targetId: receiver._id,
                        type: 'video-status',
                        isCameraOn,
                    });
                }
            }
            return isCameraOn;
        });
    };

    const handleWebRTC = useCallback(async ({ roomName }: { roomName: string }) => {
        if (!socket) return;
        setIsCall(true);
        localStorage.removeItem('incomingCall');

        if (!peerRef.current) {
            peerRef.current = new RTCPeerConnection();

            peerRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('video-signal', {
                        targetId: receiver?._id,
                        type: 'ice-candidate',
                        candidate: event.candidate,
                    });
                }
            };

            peerRef.current.ontrack = (event) => {
                const remoteStream = event.streams[0];
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = remoteStream;
                }

                remoteStream.getAudioTracks().forEach(track => {
                    if (remoteAudioRef.current) {
                        const audioStream = new MediaStream([track]);
                        remoteAudioRef.current.srcObject = audioStream;
                    }
                });
            };

            // Get local media stream
            const localStream = await navigator.mediaDevices.getUserMedia({ video: openVideo, audio: openMic });

            // Add tracks to the peer connection
            localStream.getTracks().forEach(track => peerRef.current?.addTrack(track, localStream));

            streamRef.current = localStream;

            const offer = await peerRef.current.createOffer();
            await peerRef.current.setLocalDescription(offer);

            socket.emit('video-signal', {
                targetId: receiver?._id,
                type: 'offer',
                offer,
            });
        }
    }, [openMic, openVideo, socket, receiver]);

    const handleEndWebRTC = useCallback(() => {
        if (!socket) return;
        if (peerRef.current) {
            peerRef.current.close();
            peerRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        setIsCall(false);
        setIsCallVideo(false);
    }, [socket, setIsCall, setIsCallVideo]);

    const handleSignalingData = useCallback(async ({ type, offer, answer, candidate, isMicOn, isCameraOn
    }: {
        type: string, offer?: RTCSessionDescriptionInit, answer?: RTCSessionDescriptionInit, candidate?: RTCIceCandidateInit, isMicOn: boolean, isCameraOn: boolean
    }) => {
        try {
            if (!socket) return;
            if (!peerRef.current) peerRef.current = new RTCPeerConnection();

            if (type === 'offer' && offer) {
                if (peerRef.current.signalingState === 'stable') {
                    await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                    const localAnswer = await peerRef.current.createAnswer();
                    await peerRef.current.setLocalDescription(localAnswer);

                    socket.emit('video-signal', {
                        targetId: receiver?._id,
                        type: 'answer',
                        answer: localAnswer,
                    });
                } else { console.error('PeerConnection is not stable, cannot process offer'); }

            } else if (type === 'answer' && answer) {
                if (peerRef.current.signalingState === 'have-local-offer') {
                    try { await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer)); }
                    catch (error) { console.error('Error setting remote description', error); }
                }
            } else if (type === 'ice-candidate' && candidate) {
                await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } else if (type === 'mic-status') {
                setIsRemoteMicOn(isMicOn);
            } else if (type === 'video-status') {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.style.display = isCameraOn ? 'block' : 'none';
                }
                // setIsRemoteCameraOn(isCameraOn);
            }
        } catch (error) { console.error('Error handling signaling data:', error); }
    }, [socket, receiver]);

    const handleEndCallReject = useCallback((data: any) => {
        setIsCallReject(true);
    }, []);

    const handleEndCall = useCallback(() => {
        if (!socket) return;
        socket.emit('onCallEnd', { conversation: conversation?.slug });
        handleEndWebRTC();
    }, [socket, conversation, handleEndWebRTC]);

    useEffect(() => {
        if (!socket) return;
        socket.on('startWebRTC', handleWebRTC);
        socket.on('endWebRTC', handleEndWebRTC)
        socket.on('video-signal', handleSignalingData);
        socket.on('rejectCall', handleEndCallReject);

        return () => {
            socket.off('startWebRTC', handleWebRTC);
            socket.off('video-signal', handleSignalingData);
            socket.off('rejectCall', handleEndCallReject);
        };
    }, [socket, handleWebRTC, handleEndWebRTC, handleSignalingData, handleEndCallReject]);

    useEffect(() => {
        const getMediaStream = async () => {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: openVideo });
            localStream.getTracks().forEach(track => peerRef.current?.addTrack(track, localStream));
            if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
        };
        if (openVideo) {
            getMediaStream();
        }

    }, [isCall, localVideoRef, openMic, openVideo]);

    const renderCallVideo = () => {
        return (
            <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <VideoContainer>
                            <VideoElement ref={localVideoRef} autoPlay playsInline aria-label="Local video" />
                            <ControlsOverlay>
                                <IconButton onClick={toggleMic} aria-label="Toggle mute" sx={{ marginRight: '10px' }}>
                                    {openMic ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                </IconButton>
                                <IconButton onClick={handleVideoToggle} aria-label="Toggle video" sx={{ marginRight: '15px' }}>
                                    {openVideo ? <FaVideo /> : <FaVideoSlash />}
                                </IconButton>
                                <IconButton sx={ButtonEndCall}
                                    onClick={handleEndCall}
                                    aria-label="End call"
                                >
                                    <CallEndIcon sx={{ fontSize: '30px' }} />
                                </IconButton>
                            </ControlsOverlay>
                        </VideoContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <VideoContainer>
                            <VideoElement ref={remoteVideoRef} autoPlay playsInline aria-label="Remote video" />
                            <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                                {isRemoteMicOn ? <FaMicrophone style={{ fontSize: 25 }} /> : <FaMicrophoneSlash style={{ fontSize: 25 }} />}
                            </Box>
                        </VideoContainer>
                        <audio ref={remoteAudioRef} autoPlay />
                    </Grid>
                </Grid>
            </Box>
        )
    }
    return (
        <>
            {isCallReject ? <RejectCall setIsCall={setIsCallVideo} /> : renderCallVideo()}
        </>
    );
}

export default CallVideo;
