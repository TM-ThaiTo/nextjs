'use client';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "@/utils/hooks/router/useRouter";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RenderRoomMessages from "../render/room.message";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
type Props = {
    children: React.ReactNode;
    rooms: any;
}

export default function LayoutRequestMessage({ children, rooms }: Props) {
    const { textColorPrimary, actionHoverColor, actionActiveColor } = useThemeColors();
    const lang = getLanguage();
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', height: '100vh' }}>
                <Box sx={{ maxWidth: 400, height: '100vh', width: '100%', overflow: 'auto', overflowY: 'scroll' }}>
                    <Box sx={{ height: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                        <IconButton
                            sx={{
                                fontWeight: 600,
                                fontSize: 20,
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: actionHoverColor },
                                '&:active': { backgroundColor: actionActiveColor },
                            }}
                            onClick={() => router.push('/message')}>
                            <KeyboardBackspaceIcon sx={{ color: textColorPrimary, fontSize: '30px' }} />
                        </IconButton>
                        <Typography variant="h6" component="h1" sx={{ fontWeight: 1000, fontSize: '20px' }} >
                            {locales[lang]?.message?.messageRequest?.MessageRequests}
                        </Typography>
                        <div />
                    </Box>
                    <RenderRoomMessages chatrooms={rooms} myUser={null} />
                </Box>
                <Box sx={{ height: !isMobile ? '100vh' : 'calc(100vh - 80px)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}