import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { BackgroundEndCall, ButtonComeback } from '@/components/calls/styles/EndCall_style';

type EndCallProps = {
    setIsCallVoice: (isCallVoice: boolean) => void;
};

function EndCall({ setIsCallVoice }: EndCallProps) {
    return (
        <Box sx={BackgroundEndCall}>
            <CallEndIcon sx={{ fontSize: 80, color: '#d32f2f', marginBottom: '20px' }} />
            <Typography variant="h4" color="#d32f2f" gutterBottom >
                Call Ended
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                The call has been successfully disconnected.
            </Typography>
            <IconButton sx={ButtonComeback} onClick={() => setIsCallVoice(false)}>
                <ChevronLeftIcon />
            </IconButton>
        </Box>
    );
}

export default EndCall;
