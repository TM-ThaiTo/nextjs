'use client';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { style_main } from '@/style/style_mui/style.page';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import RouterFormNotification from './components/router';

type Props = {
    children: React.ReactNode;
}

export default function LayoutNotification({ children }: Props) {
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { textColorPrimary, borderColor, actionHoverColor } = useThemeColors();
    const router = useRouter();
    const handleBack = () => router.back();

    return (
        <>
            <Box sx={style_main}>
                <Box sx={{ width: '100%', maxWidth: 700, height: '100vh', border: `1px solid ${borderColor}` }}>
                    <Box sx={{ width: '100%', height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${borderColor}` }}>
                        <IconButton onClick={handleBack} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: textColorPrimary, '&:hover': { backgroundColor: actionHoverColor } }} >
                            <ArrowBackIosIcon sx={{ fontSize: 30, pl: '5px' }} />
                        </IconButton>
                        <Typography sx={{ fontSize: 20, color: textColorPrimary, fontWeight: 700 }}>
                            {locales[lang]?.notificationPage?.title}
                        </Typography>
                        <div />
                    </Box>
                    <Box sx={{ height: 50, width: '100%' }}>
                        <RouterFormNotification />
                    </Box>
                    <div style={{ height: 'calc(100vh - 135px)' }}>
                        {children}
                    </div>
                </Box>
            </Box>
        </>
    )
}