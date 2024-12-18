'use client'

import { useCallback, useState } from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReplyIcon from '@mui/icons-material/Reply';
import MoodIcon from '@mui/icons-material/Mood';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReportIcon from '@mui/icons-material/Report';
import { FaReply } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { styleButton, popoverStyle } from '@/components/message/styles/index';
import { formatTimeMessage } from '@/helper/formatTime';
import { api } from '@/utils/api';
import useThemeColors from "@/utils/hooks/theme/hookTheme";

type Props = {
    myMessage: boolean;
    isRight: boolean;
    time: any;
    messageId: string;
    content: string;
}

const ActionItemMessage = ({ isRight, time, myMessage, messageId, content }: Props) => {
    const { textColorPrimary } = useThemeColors();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleUnsend = async () => {
        const { data, error } = await api(`/message/${messageId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        });
    };

    const handleReport = () => {
        console.log('Report message', messageId);
    }

    const handleCopy = useCallback(() => {
        if (content) {
            navigator.clipboard.writeText(content)
                .then(() => { console.log('Message copied to clipboard:', content) })
                .catch((err) => { console.error('Failed to copy message:', err) });
        }
    }, [content]);

    const handleForward = useCallback(() => {
        console.log('Forward message', messageId);
    }, [messageId]);

    return (
        <>
            <Box sx={{ display: 'flex', margin: isRight ? '0 10px 0 0' : '0 0 0 10px', color: textColorPrimary }}>
                <Tooltip title="More" arrow>
                    <IconButton sx={{ color: textColorPrimary }} onClick={handleClick} size="small"><MoreHorizIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Reply" arrow>
                    <IconButton sx={{ color: textColorPrimary }} size="small"><ReplyIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Mood" arrow>
                    <IconButton sx={{ color: textColorPrimary }} size="small"><MoodIcon /></IconButton>
                </Tooltip>
            </Box>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        overflow: 'hidden',
                    },
                }}
            >
                <Box sx={popoverStyle}>
                    <Box sx={{ padding: '10px 15px' }}>
                        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold' }}>
                            {formatTimeMessage(time)}
                        </Typography>
                        <Box sx={{ borderBottom: '1px solid grey', margin: '8px 0' }} />

                        <Button sx={styleButton} size="small" onClick={handleCopy}>
                            <Typography variant="body2" sx={{ color: 'black', marginLeft: 1 }}>Copy</Typography>
                            <ContentCopyIcon />
                        </Button>
                        <Button sx={styleButton} size="small" onClick={handleForward}>
                            <Typography variant="body2" sx={{ color: 'black', marginLeft: 1 }}>Forward</Typography>
                            <FaShare />
                        </Button>
                        <Box sx={{ borderBottom: '1px solid grey', margin: '8px 0' }} />

                        {myMessage ? (
                            <Button sx={{ ...styleButton, color: 'red' }} size="small" onClick={handleUnsend}>
                                <Typography variant="body2" sx={{ color: 'red', marginLeft: 1 }}>Unsend</Typography>
                                <FaReply />
                            </Button>
                        ) : (
                            <Button sx={{ ...styleButton, color: 'red' }} size="small" onClick={handleReport}>
                                <Typography variant="body2" sx={{ color: 'red', marginLeft: 1 }}>Report</Typography>
                                <ReportIcon />
                            </Button>
                        )}
                    </Box>
                </Box>
            </Popover>
        </>
    )
};

export default ActionItemMessage;