import { useState } from 'react';
import Link from "next/link";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AiOutlineEdit } from "react-icons/ai";
import { MdGroup, MdRefresh, MdRequestPage } from "react-icons/md";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import NewMessageModal from "@/components/message/main/modal.new.message";

type TopNavBarMessageProps = {
    myUser: any;
    handleResetRoom: () => void;
}

export default function TopNavBarMessage({ myUser, handleResetRoom }: TopNavBarMessageProps) {
    const { borderColor, textColorPrimary, boxColor, actionHoverColor, linkColor } = useThemeColors();
    const lang = getLanguage();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handlePopoverClose = () => setAnchorEl(null);
    const isPopoverOpen = Boolean(anchorEl);

    return (
        <>
            <>
                <Box sx={{ height: 80, p: 2, borderBottom: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={myUser?.avatar || '/static/avt_default.png'} alt={myUser?.name} sx={{ mr: 2, border: `1px solid ${borderColor}` }} />
                        <Typography component="span" variant="h6"> {myUser?.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={handleOpen} sx={{ color: textColorPrimary }}>
                            <AiOutlineEdit />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '10px', pr: '10px' }}>
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 1000, fontSize: '20px', color: textColorPrimary }} >{locales[lang]?.message?.Messages}</Typography>
                    <IconButton onClick={handlePopoverOpen} sx={{ color: textColorPrimary }}> <MoreHorizIcon /> </IconButton>
                </Box>
            </>

            <Popover
                open={isPopoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box sx={{ minWidth: '150px', backgroundColor: boxColor, borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Box
                        onClick={handleResetRoom}
                        sx={{
                            display: 'flex', alignItems: 'center', cursor: 'pointer',
                            color: linkColor, height: 50, pl: '10px',
                            '&:hover': { color: '#0056b3' }
                        }}
                    >
                        <MdRefresh style={{ marginRight: '8px', fontSize: '20px' }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{locales[lang]?.message?.Reset}</Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '100%', height: 50, display: 'flex', alignItems: 'center', pl: '10px',
                            '&:hover': { backgroundColor: actionHoverColor }
                        }}>
                        <Link href="/message/requests" style={{ height: '100%', width: '100%', textDecoration: 'none', color: textColorPrimary, display: 'flex', alignItems: 'center' }} >
                            <MdRequestPage style={{ marginRight: '8px', fontSize: '20px', color: textColorPrimary }} />
                            <Typography variant="body1" sx={{ fontWeight: 500, color: textColorPrimary }}>{locales[lang]?.message?.Requests}</Typography>
                        </Link>
                    </Box>

                    <Box sx={{
                        width: '100%', height: 50, display: 'flex', alignItems: 'center', pl: '10px',
                        '&:hover': { backgroundColor: actionHoverColor }
                    }}>
                        <Link href="/message/groups" style={{ height: '100%', width: '100%', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }} >
                            <MdGroup style={{ marginRight: '8px', fontSize: '20px', color: textColorPrimary }} />
                            <Typography variant="body1" sx={{ fontWeight: 500, color: textColorPrimary }}>{locales[lang]?.message?.Groups}</Typography>
                        </Link>
                    </Box>
                </Box>
            </Popover>
            {open && <NewMessageModal open={open} onClose={handleClose} />}
        </>
    )
}