'use client'

import { memo } from "react";
import { Typography, Avatar, IconButton, AppBar, Toolbar } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ReportIcon from '@mui/icons-material/Report';

type Props = {
    room: SelectedRoom;
    myUser: any;
    recipient: any;
    isOpenReport: boolean;
    setIsOpenReport: (isOpen: boolean) => void;
    useThemeColors: any;
}
type SelectedRoom = {
    id: string;
    slug: string;
}
const TopReceiver = memo(({ recipient, room, isOpenReport, setIsOpenReport, useThemeColors }: Props) => {
    const { textColorPrimary, borderColor } = useThemeColors();
    const { slug } = room;

    const handleCallVoice = (type: number) => {
        if (type === 1) {
            const url = `/call/?has_video=false&roomId=${slug}`;
            window.open(url, '_blank');
        }
        if (type === 2) {
            const url = `/call/?has_video=true&roomId=${slug}`;
            window.open(url, '_blank');
        }
    };
    const handleOpenReport = () => setIsOpenReport(!isOpenReport);

    return (
        <AppBar position="static" color="default" elevation={0}
            sx={{ height: 80, display: 'flex', justifyContent: 'center', zIndex: 10, borderBottom: `1px solid ${borderColor}` }}
        >
            <Toolbar>
                <Avatar src={recipient.avatar || '/static/avt_default.png'} alt={recipient.fullName} sx={{ border: `0,5px solid ${borderColor}` }} />
                <Typography component="span" variant="h6" sx={{ ml: 2, flexGrow: 1, color: textColorPrimary }}>{recipient.fullName}</Typography>

                <IconButton sx={{ color: textColorPrimary }} onClick={() => handleCallVoice(1)}>
                    <PhoneIcon sx={{ fontSize: 30 }} />
                </IconButton>

                <IconButton sx={{ color: textColorPrimary }} onClick={() => handleCallVoice(2)}>
                    <VideocamIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton sx={{ color: textColorPrimary }} onClick={handleOpenReport}>
                    {isOpenReport ? <ReportIcon sx={{ fontSize: 30 }} /> : <ReportGmailerrorredIcon sx={{ fontSize: 30 }} />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
});

TopReceiver.displayName = 'TopReceiver';
export default TopReceiver;