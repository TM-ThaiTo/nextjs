'use client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';

export default function RequestPageMessage() {
    const { borderColor, textColorPrimary, boxColor, textColorSecondary, actionHoverColor } = useThemeColors();
    const lang = getLanguage();
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            color={textColorPrimary}
            textAlign="center"
            gap={2}
            sx={{ padding: 4 }}
        >
            <Avatar
                sx={{
                    width: 90,
                    height: 90,
                    bgcolor: 'transparent',
                    border: `2px solid ${borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <EmojiPeopleIcon sx={{ fontSize: 50, color: textColorPrimary }} />
            </Avatar>
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: textColorPrimary, fontSize: 20 }}
            >
                {locales[lang]?.message?.messageRequest?.MessageRequests}
            </Typography>
            <Typography variant="body2" sx={{ color: textColorSecondary, fontSize: '15px', maxWidth: 700 }}>
                {locales[lang]?.message?.messageRequest?.caption1}
            </Typography>
            <Typography variant="body2" sx={{ color: textColorSecondary, fontSize: '15px', maxWidth: 700 }}>
                {locales[lang]?.message?.messageRequest?.caption2}
            </Typography>
            <Button
                variant="contained"
                sx={{ bgcolor: boxColor, color: textColorPrimary, marginTop: 2, '&:hover': { bgcolor: actionHoverColor, }, }}
            >
                {locales[lang]?.message?.messageRequest?.learnMore}
            </Button>
        </Box>
    );
}
