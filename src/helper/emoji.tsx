import React, { useState, MouseEvent, forwardRef } from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickerPopupProps {
    onEmojiSelect: (emoji: string) => void;
}

// Add the ref parameter, even if it's not used
export const EmojiPickerPopup = forwardRef<HTMLDivElement, EmojiPickerPopupProps>(
    ({ onEmojiSelect }, ref) => {  // Accept the ref as the second argument
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        const handleClick = (event: MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleEmojiSelect = (emojiData: EmojiClickData) => {
            onEmojiSelect(emojiData.emoji);
            handleClose();
        };

        const open = Boolean(anchorEl);
        const id = open ? 'emoji-popover' : undefined;

        return (
            <Box ref={ref}> {/* You can attach ref here or ignore if not needed */}
                <IconButton sx={{ color: '#01d6fa' }} onClick={handleClick} aria-describedby={id}>
                    <EmojiEmotionsIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box p={1}>
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </Box>
                </Popover>
            </Box>
        );
    }
);

// Add a display name for easier debugging
EmojiPickerPopup.displayName = 'EmojiPickerPopup';
