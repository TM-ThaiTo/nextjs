'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useSocket } from '@/utils/socket/socket.context';
import formatDuration from '@/helper/formatDiration'
import { ButtonEndCall } from '@/components/calls/styles/EndCall_style';
import RejectCall from '@/components/calls/RejectCall';
import EndCall from './EndCall';

type Props = {
    data: any;
    isMicOn: boolean;
    setIsMicOn: (isMicOn: boolean) => void;
    setIsCallVoice: (isCallVoice: boolean) => void;
}

export default function CallVoice({ data, isMicOn, setIsMicOn, setIsCallVoice }: Props) {
    const { socket } = useSocket();
    const { receiver, conversation } = data;
    const [isEndCall, setIsEndCall] = useState<boolean>(false);
    const [isCallReject, setIsCallReject] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [callDuration, setCallDuration] = useState<number>(0);
    const [openMic, setOpenMic] = useState<boolean>(isMicOn);
    const [isCall, setIsCall] = useState<boolean>(false);
    const peerRef = useRef<RTCPeerConnection | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const toggleMic = useCallback(() => {
        setOpenMic((prev) => {
            const isMicOn = !prev;
            setIsMicOn(isMicOn);

            if (streamRef.current) {
                streamRef.current.getAudioTracks().forEach((track) => {
                    track.enabled = isMicOn;
                });

                if (socket && receiver) {
                    socket.emit('audio-signal', {
                        targetId: receiver._id,
                        type: 'mic-status',
                        isMicOn,
                    });
                }
            }

            return isMicOn;
        });
    }, [receiver, setIsMicOn, socket]);
    const handleWebRTC = useCallback(async ({ roomName }: { roomName: string }) => {
        if (!socket) return;
        setIsCall(true);
        localStorage.removeItem('incomingCall');

        if (!peerRef.current) {
            peerRef.current = new RTCPeerConnection();

            peerRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('audio-signal', {
                        targetId: receiver?._id,
                        type: 'ice-candidate',
                        candidate: event.candidate,
                    });
                }
            };

            peerRef.current.ontrack = (event) => {
                const remoteStream = event.streams[0];
                if (audioRef.current) {
                    audioRef.current.srcObject = remoteStream;
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => peerRef.current?.addTrack(track, stream));

            streamRef.current = stream;

            const offer = await peerRef.current.createOffer();
            await peerRef.current.setLocalDescription(offer);

            socket.emit('audio-signal', {
                targetId: receiver?._id,
                type: 'offer',
                offer,
            });
        }
    }, [socket, receiver]);

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
        setCallDuration(0);
    }, [socket]);

    const handleSettupEndCall = useCallback(() => {
        setIsEndCall(true);
        handleEndWebRTC();
    }, [handleEndWebRTC]);

    const handleSettupRejectCall = useCallback(() => {
        setIsCallReject(true);
        handleEndWebRTC();
    }, [handleEndWebRTC]);

    const handleSignalingData = useCallback(async ({ type, offer, answer, candidate }: { type: string, offer?: RTCSessionDescriptionInit, answer?: RTCSessionDescriptionInit, candidate?: RTCIceCandidateInit }) => {
        if (!socket) return;
        if (!peerRef.current) peerRef.current = new RTCPeerConnection();

        if (type === 'offer' && offer) {
            // First, set the remote description for the incoming offer
            if (peerRef.current.signalingState === 'stable') {
                await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                const localAnswer = await peerRef.current.createAnswer();
                await peerRef.current.setLocalDescription(localAnswer);

                socket.emit('audio-signal', {
                    targetId: receiver?._id,
                    type: 'answer',
                    answer: localAnswer,
                });
            } else {
                console.error('PeerConnection is not stable, cannot process offer');
            }
        } else if (type === 'answer' && answer) {
            if (peerRef.current.signalingState === 'have-local-offer') {
                await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            }
        } else if (type === 'ice-candidate' && candidate) {
            try {
                await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error) {
                console.error('Error adding received ICE candidate', error);
            }
        }
    }, [socket, receiver]);

    const handleEndCall = useCallback(() => {
        if (!socket) return;
        socket.emit('onCallEnd', { conversation: conversation?.slug });
        handleSettupEndCall();
    }, [socket, conversation, handleSettupEndCall]);

    useEffect(() => {
        if (!socket) return;

        socket.on('startWebRTC', handleWebRTC);
        socket.on('endWebRTC', handleSettupEndCall)
        socket.on('rejectCall', handleSettupRejectCall);
        socket.on('audio-signal', handleSignalingData);

        return () => {
            socket.off('startWebRTC', handleWebRTC);
            socket.off('endWebRTC', handleSettupEndCall)
            socket.off('rejectCall', handleSettupRejectCall);
            socket.off('audio-signal', handleSignalingData);
        };
    }, [socket, handleWebRTC, handleSettupEndCall, handleSignalingData, handleSettupRejectCall]);

    useEffect(() => {
        if (isCall) {
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            setCallDuration(0);
        }
    }, [isCall]);

    const renderCallVoice = useCallback(() => {
        return (
            <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
                <Box sx={{ width: 'auto', height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar src={receiver?.avatar || '/static/avt_default.png'} sx={{ width: 120, height: 120, mb: 2, border: '1px solid black' }} />
                        </Box>
                        <Typography variant="h4" sx={{ mb: 1, display: 'flex', justifyContent: 'center', fontWeight: 800 }}>
                            {receiver?.fullName}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3, display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
                            {isCall ? (
                                <>In call - {formatDuration(callDuration)}</>
                            ) : (
                                <>Calling...</>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <IconButton sx={ButtonEndCall} onClick={handleEndCall}>
                            <CallEndIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                        <IconButton onClick={toggleMic} sx={{ color: 'black' }}>
                            {openMic ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>
                        <audio ref={audioRef} autoPlay />
                    </Box>
                </Box>
            </Box>
        )
    }, [receiver, isCall, callDuration, openMic, handleEndCall, toggleMic]);

    if (isCallReject) return <RejectCall setIsCall={setIsCallVoice} />
    if (isEndCall) return <EndCall setIsCallVoice={setIsCallVoice} />

    return renderCallVoice();
}