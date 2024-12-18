'use client'
import { Typography, Avatar, IconButton, AppBar, Toolbar, Stack, Box } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ReportIcon from '@mui/icons-material/Report';
import { style_avatar_myuser, style_avatar_owner, style_total_member, } from '@/style/style_mui/message'

type Props = {
    data: any,
    isOpenReport: boolean;
    setIsOpenReport: (isOpen: boolean) => void;
}
const TopGroupReceiver = ({ data, isOpenReport, setIsOpenReport }: Props) => {

    const { auth, conversation, user } = data;
    const { myUser, owner, members } = user;
    const slug = conversation?.slug;
    const totalMember = conversation?.totalMember;
    const avatarOwner = owner?.avatar;
    const avatarMyUser = myUser?.avatar === avatarOwner ? members[0]?.avatar : myUser?.avatar;

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

    const handleOpenReport = () => {
        setIsOpenReport(!isOpenReport);
    }

    return (
        <AppBar position="static" color="default" elevation={0}
            sx={{ height: 80, display: 'flex', justifyContent: 'center', zIndex: 10, borderBottom: '1px solid gray' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Stack direction="row" spacing={-1} sx={{ position: 'relative', width: 60, height: 60 }} >
                        <Avatar src={avatarOwner || '/static/avt_default.png'} alt="Owner Avatar" sx={style_avatar_owner} />
                        <Avatar src={avatarMyUser || '/static/avt_default.png'} alt="Member Avatar" sx={style_avatar_myuser} />
                        <Avatar sx={style_total_member} >
                            {totalMember > 100 ? '99+' : `+${totalMember - 2}`}
                        </Avatar>
                    </Stack>

                    <Typography component="span" variant="h6" sx={{
                        ml: 2, flexGrow: 1, minWidth: 100, width: '100%', maxWidth: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>{conversation?.displayName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton sx={{ color: 'black' }} onClick={() => handleCallVoice(1)}>
                        <PhoneIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                    <IconButton sx={{ color: 'black' }} onClick={() => handleCallVoice(2)}>
                        <VideocamIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                    <IconButton sx={{ color: 'black' }} onClick={handleOpenReport}>
                        {isOpenReport ? <ReportIcon sx={{ fontSize: 30 }} /> : <ReportGmailerrorredIcon sx={{ fontSize: 30 }} />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default TopGroupReceiver;