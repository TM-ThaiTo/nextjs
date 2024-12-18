'use client'

import React, { useState } from 'react';
import { Message } from "@/types/message";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { itemMessageImageBox, imageMessage, fullImageMessage, videoMessage } from '@/components/message/styles/index';
import { decryptData } from '../../../helper/decryptData';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';

type RenderItemOneMessageProps = {
    isMyMessage: boolean;
    time: any;
    iMessage: Message;
    room: any;
}
export default function RenderItemMessage({ isMyMessage, time, iMessage, room }: RenderItemOneMessageProps) {
    const { useThemeColors } = importThemeAndLanguge();
    const { textColorPrimary, textColorSecondary, borderColor, boxColor, linkColor } = useThemeColors();

    const { type: typeMessage, content: contentMessage } = iMessage?.message;
    const content = typeMessage === 0 ? decryptData(contentMessage, room?.key) : contentMessage;
    const senderFullName = iMessage?.userSender?.fullName;
    const senderAvatar = iMessage?.userSender?.avatar;
    const type = iMessage?.message?.type;
    const url = iMessage?.message?.url;

    const [open, setOpen] = useState<boolean>(false);
    const [selectedUrl, setSelectedUrl] = useState<{ url: string, type: number } | null>(null);

    const handleClickOpen = (url: string, type: number) => {
        if (type !== 1 && type !== 3) return;
        setSelectedUrl({ url, type });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUrl(null);
    };

    const renderTootlTip = () =>
        <ListItemAvatar>
            <Tooltip title={senderFullName} placement="left">
                <Avatar alt={senderFullName || '/static/avt_default.png'} src={senderAvatar} sx={{ border: `1px solid ${borderColor}` }} />
            </Tooltip>
        </ListItemAvatar>

    const handleRenderImage = () =>
        <Box sx={{ ...itemMessageImageBox, border: `1px solid ${borderColor}` }}>
            <Box component="img" src={`${url}`} alt={`Image ${url}`}
                sx={imageMessage} onClick={() => handleClickOpen(`${url}`, type)} />
        </Box>

    const handleRenderVideo = () =>
        <Box sx={{ ...itemMessageImageBox, display: 'flex', justifyContent: 'center' }}>
            <Box component="video" width="200px" controls sx={{ ...videoMessage, maxHeight: 400, minHeight: 100 }} onClick={() => handleClickOpen(`${url}`, type)}>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </Box>
        </Box>

    const renderDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        padding: 0,
                        margin: 0,
                        border: 'none',
                        width: 'auto',
                        height: 'auto',
                    },
                }}
            >
                {selectedUrl?.type === 1 && (
                    <Box component="img" src={selectedUrl?.url} alt="Zoomed" sx={fullImageMessage} />
                )}

                {selectedUrl?.type === 3 && (
                    <Box component="video" controls sx={fullImageMessage}  >
                        <source src={selectedUrl?.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </Box>
                )}

                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute', top: 8, right: 8, color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Dialog>
        )
    }
    const handleRenderContentTextMessage = (isMyMessage: boolean, content: string) => (
        <ListItemText
            primary={
                <Typography component="span" variant="body2"
                    sx={{
                        wordWrap: 'break-word',
                        color: isMyMessage ? textColorPrimary : textColorSecondary
                    }}>
                    {content}
                </Typography>
            }
        />
    );
    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                width: 'auto',
                maxWidth: 600,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor:
                    (type !== 1 && type !== 3 && isMyMessage) ? linkColor : (type === 1 || type === 3 ? 'transparent' : boxColor),
            }}
        >
            {!isMyMessage && renderTootlTip()}
            {type === 1 && url && handleRenderImage()}
            {type === 3 && url && handleRenderVideo()}
            {type !== 1 && type !== 2 && type !== 3 && <>{handleRenderContentTextMessage(isMyMessage, content)}</>}
            {renderDialog()}
        </ListItem>
    )
}