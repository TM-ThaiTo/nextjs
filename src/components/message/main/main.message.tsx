'use client';

import { useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { FaFacebookMessenger } from "react-icons/fa";
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import NewMessageModal from "./modal.new.message";

export default function MainPageMessage() {
    const { borderColor, textColorPrimary, textColorSecondary, actionHoverColor } = useThemeColors();
    const lang = getLanguage();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" color="white" textAlign="center" gap={2} >
                <Avatar sx={{ width: 90, height: 90, bgcolor: 'transparent', border: `2px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                    <FaFacebookMessenger style={{ fontSize: 50, color: textColorPrimary }} />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" sx={{ color: textColorPrimary }}>
                    {locales[lang]?.message?.YourMessages}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '20px', color: textColorSecondary }}>
                    {locales[lang]?.message?.SendToStartChat}
                </Typography>
                <Button variant="contained" sx={{
                    mt: 2, color: textColorPrimary,
                    backgroundColor: borderColor,
                    '&:hover': { backgroundColor: actionHoverColor }
                }} onClick={handleOpen}>
                    {locales[lang]?.message?.SendMessage}
                </Button>
            </Box>
            {open && <NewMessageModal open={open} onClose={handleClose} />}
        </>
    )
}