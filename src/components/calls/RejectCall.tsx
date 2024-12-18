import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CallEndIcon from '@mui/icons-material/CallEnd'
import Icon from '@mui/material/Icon';
import { BackgroundEndCall, ButtonComeback } from '@/components/calls/styles/EndCall_style';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Props = {
    setIsCall: (isCallVoice: boolean) => void;
}

function RejectCall({ setIsCall }: Props) {
    return (
        <Box sx={BackgroundEndCall} >
            <Icon sx={{ fontSize: 80, color: '#d32f2f', marginBottom: '20px' }}>
                <CallEndIcon fontSize="inherit" />
            </Icon>
            <Typography variant="h4" color="#d32f2f" gutterBottom>
                Call Rejected
            </Typography>
            <Typography variant="body1" color="textSecondary">
                The call was declined.
            </Typography>
            <IconButton sx={ButtonComeback} onClick={() => setIsCall(false)}>
                <ChevronLeftIcon sx={{ fontSize: '30px' }} />
            </IconButton>
        </Box>
    )
}

export default RejectCall;