'use client';
import React, { useState, useCallback } from 'react';
import { Box, TextField, IconButton, Tooltip, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { EmojiPickerPopup } from '@/helper/emoji';
import { InputImage, LayoutText, ButtonRemoveImage, StyleImage } from '@/components/message/styles/index';
import Image from 'next/image';
import { crateMessage } from '@/actions/chat/group/message/actions';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type InputTextFieldProps = {
    idRoom: string;
};

export default function InputTextGroupField({ idRoom }: InputTextFieldProps) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [message, setMessage] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        }
    }

    const removeFile = (index: number) => setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    const onSubmit = useCallback(async () => {
        if (!message && files.length === 0) return;

        const formData = new FormData();
        formData.append('idConversation', idRoom);
        if (message) formData.append('content', message);
        files.forEach((file) => formData.append('files', file));

        setLoading(true); // Set loading state

        const { error } = await crateMessage(formData);

        setLoading(false);

        if (error) {
            setSnackbarMessage({ type: 'error', message: 'Failed to send message' });
            setOpenSnackbar(true);
            return;
        }
        setMessage('');
        setFiles([]);
    }, [message, idRoom, files, setOpenSnackbar, setSnackbarMessage]);

    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                onSubmit();
            }
        },
        [onSubmit]
    );

    return (
        <Box sx={LayoutText}>
            {files.length > 0 && (
                <Box sx={InputImage}>
                    {files.map((file, index) => (
                        <Box key={index} sx={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                            {file.type.startsWith('image/') ? (
                                <Image src={URL.createObjectURL(file)} alt="preview" width={200} height={200} style={StyleImage} objectFit="cover" />
                            ) : file.type.startsWith('video/') ? (
                                <video
                                    src={URL.createObjectURL(file)} width={200}
                                    height={200} controls style={StyleImage}
                                />
                            ) : (
                                <Typography variant="body1">
                                    {file?.name}
                                </Typography>
                            )}

                            <IconButton onClick={() => removeFile(index)} sx={ButtonRemoveImage} size="small">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input type="file" id="file-upload" multiple
                    accept="image/png, image/jpeg, image/jpg, video/mp4, video/mov"
                    style={{ display: 'none' }} onChange={handleFileChange}
                />
                <IconButton color="primary" aria-label="attach file" onClick={() => document.getElementById('file-upload')?.click()}>
                    <AttachFileIcon />
                </IconButton>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Input message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    maxRows={4}
                    sx={{ mx: 1 }}
                />

                <Tooltip title="Add emoji" placement="top">
                    <span>
                        <EmojiPickerPopup onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)} />
                    </span>
                </Tooltip>

                <Tooltip title="Send message" placement="top">
                    <span>
                        <IconButton
                            color="primary"
                            aria-label="send message"
                            onClick={onSubmit}
                            disabled={loading || (!message && files.length === 0)}
                        >
                            {loading ? <CircularProgress size={24} /> : <SendIcon />}
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </Box>
    );
}
