'use client'

import React, { useCallback, useMemo } from 'react';
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useSocket } from '@/utils/socket/socket.context';

type Props = {
    open: boolean;
    data: any;
    hasSetNotification: React.MutableRefObject<boolean>;
    setIsOpenNotificationCall: (open: boolean) => void;
};

function CallNotification({
    open, data, setIsOpenNotificationCall, hasSetNotification
}: Props) {
    const { socket } = useSocket();
    const { caller, conversation, receiver, video } = useMemo(() => data || {}, [data]);

    const handleAccept = useCallback(() => {
        if (conversation && typeof video !== 'undefined') {
            const url = `/call/?has_video=${video}&roomId=${conversation}`;
            window.open(url, '_blank');
        }
    }, [conversation, video]);

    const handleReject = useCallback(() => {
        if (socket && data) {
            socket.emit('onRnjectCall', data);
            localStorage.removeItem('incomingCall');
            hasSetNotification.current = false;
            setIsOpenNotificationCall(false);
        }
    }, [socket, data, setIsOpenNotificationCall, hasSetNotification]);

    if (!data || !socket) return null;

    return (
        <Dialog open={open} PaperProps={{ style: { borderRadius: 16, padding: 16 } }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2} width={300} height={300} justifyContent='center'>
                <Avatar
                    src={caller?.avatar || '/static/avt_default.png'}
                    sx={{ width: 80, height: 80, backgroundColor: '#e0e0e0' }}
                />
                <Typography variant="h5" fontWeight="bold">
                    {caller?.fullName || 'Unknown Caller'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Incoming call...
                </Typography>

                <Box display="flex" justifyContent="center" width="100%" mt={2}>
                    <Box sx={{ marginRight: '10px' }}>
                        <IconButton
                            onClick={handleAccept}
                            sx={{
                                backgroundColor: '#66bb6a',
                                color: 'white',
                                '&:hover': { backgroundColor: '#43a047' },
                            }}
                        >
                            {video ? (
                                <VideocamIcon sx={{ fontSize: '30px' }} />
                            ) : (
                                <CallIcon sx={{ fontSize: '30px' }} />
                            )}
                        </IconButton>
                    </Box>

                    <Box sx={{ marginLeft: '10px' }} >
                        <IconButton
                            onClick={handleReject}
                            sx={{
                                backgroundColor: '#ef5350',
                                color: 'white',
                                '&:hover': { backgroundColor: '#d32f2f' },
                            }}
                        >
                            <CallEndIcon sx={{ fontSize: '30px' }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

export default CallNotification;