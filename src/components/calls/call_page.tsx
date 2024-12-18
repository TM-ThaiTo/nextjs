'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography, Button, Avatar, IconButton, Paper, Tooltip } from '@mui/material';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SettingsIcon from '@mui/icons-material/Settings';
import BlockIcon from '@mui/icons-material/Block';

import { useSocket } from '@/utils/socket/socket.context';
import CallVoice from '@/components/calls/CallVoice';
import CallVideo from '@/components/calls/CallVideo';
import { useCreateAudioStream } from '@/utils/hooks/useCreateAudioStream';

type Props = {
    video: boolean;
    room?: string;
    data: any;
}

export default function CallPageForm({ video, data }: Props) {
    const { user, receiver, conversation } = data;
    const { socket } = useSocket();

    const [isMicOn, setIsMicOn] = useState<boolean>(true);
    const [isCallVoice, setIsCallVoice] = useState<boolean>(false);
    useCreateAudioStream();

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
    const [isHoveringCamera, setIsHoveringCamera] = useState<boolean>(false);
    const [isCallVideo, setIsCallVideo] = useState<boolean>(false);

    useEffect(() => {
        if (isCameraOn && video) startCamera()
        else stopCamera()
    }, [isCameraOn, video]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
            setIsCameraOn(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                if (track.kind === 'video') {
                    track.stop();
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    const toggleCamera = () => {
        if (video) {
            setIsCameraOn(!isCameraOn);
        }
    };

    const toggleMic = () => {
        setIsMicOn(!isMicOn);
    };

    const handleCall = useCallback(() => {
        if (!socket) return;
        socket.emit('onCallStart', {
            caller: user?._id,
            receiver: receiver?._id,
            conversation: conversation?.slug,
            video,
        });
        if (video) setIsCallVideo(true);
        else setIsCallVoice(true);
    }, [socket, user, receiver, conversation, video]);

    if (isCallVideo) {
        return (
            <CallVideo
                data={data}
                isCameraOn={isCameraOn}
                setIsCameraOn={setIsCameraOn}
                isMicOn={isMicOn}
                setIsMicOn={setIsMicOn}
                setIsCallVideo={setIsCallVideo}
            />
        )
    }

    if (isCallVoice) {
        return (
            <CallVoice
                data={data}
                isMicOn={isMicOn}
                setIsMicOn={setIsMicOn}
                setIsCallVoice={setIsCallVoice}
            />
        )
    }

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 1000, height: 500, width: '100%', minWidth: 500 }}>
                <Box sx={{ display: 'flex', bgcolor: 'background.default', height: 500, p: 2 }}>
                    <Paper sx={{
                        height: '100%', flex: 2, display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', alignItems: 'center', mr: 2, bgcolor: 'background.paper',
                        borderRadius: '5px'
                    }}>
                        <Box sx={{ height: '90%', width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {isCameraOn && video ? (
                                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Box>
                                    <VideocamOffIcon sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h6">Camera off</Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ height: '10%', width: '100%', display: 'flex', backgroundColor: '#f1f1f1', justifyContent: 'center' }}>
                            <Box >
                                <Tooltip title={!video ? "Video calls are not allowed" : ""}>
                                    <Typography component='span'>
                                        <IconButton
                                            sx={{ color: 'black' }}
                                            onClick={toggleCamera}
                                            disabled={!video}
                                            onMouseEnter={() => setIsHoveringCamera(true)}
                                            onMouseLeave={() => setIsHoveringCamera(false)}
                                        >
                                            {!video && isHoveringCamera ? (
                                                <BlockIcon color="error" />
                                            ) : isCameraOn && video ? (
                                                <VideocamIcon />
                                            ) : (
                                                <VideocamOffIcon />
                                            )}
                                        </IconButton>
                                    </Typography>
                                </Tooltip>
                                <IconButton onClick={toggleMic} sx={{ color: 'black' }}>
                                    {isMicOn ? <MicIcon /> : <MicOffIcon />}
                                </IconButton>
                                <IconButton sx={{ color: 'black' }}><VolumeUpIcon /></IconButton>
                                <IconButton sx={{ color: 'black' }}><SettingsIcon /></IconButton>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.paper' }}>
                        <Avatar src={receiver?.avatar || '/static/avt_default.png'} sx={{ width: 100, height: 100, border: '0.5px solid black' }} />
                        <Typography variant="h5">{receiver?.fullName}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>Ready to call?</Typography>
                        <Button variant="contained" color="primary" onClick={handleCall}>
                            Start call
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}
