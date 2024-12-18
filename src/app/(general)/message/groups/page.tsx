'use client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import ButtonCreateGroup from '@/components/message/group/button.create';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';

export default function GroupPageMessage() {
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { borderColor, textColorSecondary, textColorPrimary } = useThemeColors();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh"
            textAlign="center" gap={2} sx={{ padding: 4 }} >
            <Avatar sx={{
                width: 90, height: 90, bgcolor: 'transparent', border: `2px solid ${borderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} >
                <GroupIcon sx={{ fontSize: 50, color: textColorPrimary }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" sx={{ color: textColorPrimary, fontSize: 20 }}>
                {locales[lang]?.message?.messageGroup?.GroupMessage}
            </Typography>
            <ButtonCreateGroup />
        </Box>
    );
}
