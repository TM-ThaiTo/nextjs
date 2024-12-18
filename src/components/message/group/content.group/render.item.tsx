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
import { listItemMessage, itemMessageImageBox, imageMessage, fullImageMessage, videoMessage } from '@/components/message/styles/index';
// import { handleRenderContentTextMessage } from "@/components/message/handle/render_messages";
import { decryptData } from '@/helper/decryptData';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

type RenderItemOneMessageProps = {
    isMyMessage: boolean;
    time: any;
    iMessage: any;
    room: any;
}

const handleRenderContentTextMessage = (isMyMessage: boolean, content: string) => (
    <ListItemText
        primary={
            <Typography component="span" variant="body2" sx={{ wordWrap: 'break-word', color: isMyMessage ? 'text.primary' : 'text.secondary' }}>
                {content}
            </Typography>
        }
    />
);

export default function RenderItemMessageGroup({ isMyMessage, time, iMessage, room }: RenderItemOneMessageProps) {
    const { message, user: userSender } = iMessage;
    const type = message?.type;
    const contentMessage = message?.content;
    const content = type === 0 ? decryptData(contentMessage, room?.key) : contentMessage;
    const senderFullName = userSender?.fullName;
    const senderAvatar = userSender?.avatar;
    const url = message?.url;

    const [open, setOpen] = useState<boolean>(false);
    const [selectedUrl, setSelectedUrl] = useState<{ url: string, type: number } | null>(null);

    const handleClickOpen = (url: string, type: number) => {
        if (type !== 1 && type !== 3) return;
        setSelectedUrl({ url, type });
        setOpen(true);
    };

    const handleClose = () => { setOpen(false); setSelectedUrl(null); };
    const renderTooltipAndAvatar = () => {
        return (
            <Box sx={{ marginRight: '10px', height: '100%', alignSelf: 'flex-start' }}>
                <Tooltip title={senderFullName} placement="left">
                    <Avatar
                        alt={senderFullName || '/static/avt_default.png'}
                        src={senderAvatar}
                    />
                </Tooltip>
            </Box>
        )
    }
    const handleRenderImage = () => {
        return (
            <Box sx={itemMessageImageBox}>
                <Box component="img" src={`${url}`} alt={`Image ${url}`} sx={imageMessage} onClick={() => handleClickOpen(`${url}`, type)} />
            </Box>
        )
    }
    const handleRenderVideo = () => {
        return (
            <Box sx={{ ...itemMessageImageBox, display: 'flex', justifyContent: 'center' }}>
                <Box component="video" width="400" controls sx={videoMessage} onClick={() => handleClickOpen(`${url}`, type)}>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </Box>
            </Box>
        )
    }
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
                {selectedUrl?.type === 1 && <Box component="img" src={selectedUrl?.url} alt="Zoomed" sx={fullImageMessage} />}
                {selectedUrl?.type === 3 && <Box component="video" controls sx={fullImageMessage}  >
                    <source src={selectedUrl?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </Box>
                }

                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
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
    return (
        <>
            <ListItem
                alignItems="flex-start"
                sx={{
                    ...listItemMessage,
                    display: 'flex',
                    padding: 1.5,
                    borderRadius: 2,
                }}
            >
                {!isMyMessage && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {renderTooltipAndAvatar()}
                    </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {senderFullName && !isMyMessage && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 500,
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            {senderFullName}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            backgroundColor: isMyMessage && type !== 1 && type !== 2 && type !== 3 ? '#e3f2fd' : '#f5f5f5',
                            padding: 1,
                            borderRadius: 2,
                            wordBreak: 'break-word',
                            boxShadow: 1,
                        }}
                    >
                        {type === 1 && url && handleRenderImage()}
                        {type === 3 && url && handleRenderVideo()}
                        {type !== 1 && type !== 2 && type !== 3 && handleRenderContentTextMessage(isMyMessage, content)}
                    </Box>
                </Box>
            </ListItem>

            {selectedUrl && renderDialog()}
        </>
    )
}