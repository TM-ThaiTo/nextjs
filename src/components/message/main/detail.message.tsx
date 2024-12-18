import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ButtonBase from "@mui/material/ButtonBase";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import { postBlock, deleteBlock } from '@/actions/block/actions';
import { deleteMessageConversation } from '@/actions/chat/p2p/conversation/actions';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { useRouter } from 'next/navigation';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { updateDisplayName } from '@/actions/chat/p2p/user-conversation/actions';
import { locales } from '@/language/constant';
import { getLanguage } from '@/helper/mapTypesLanguage';
type Props = {
    roomId: string;
    slug: string;
    recipient: any;
    isBlock: boolean;
    setIsBlock: (isBlock: boolean) => void;
    useThemeColors: any;
};

export default function DetailMessage({ useThemeColors, roomId, slug, recipient, isBlock, setIsBlock }: Props) {
    const { textColorPrimary, textColorSecondary, borderColor, boxColor } = useThemeColors();
    const lang = getLanguage();
    const router = useRouter();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [confimOpenBlock, setConfimOpenBlock] = useState<boolean>(false);
    const [confimOpenDeleteChat, setConfimDeleteChat] = useState<boolean>(false);

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>(recipient?.fullName || '');
    const handleToggleEdit = () => { setIsEditMode((prev) => !prev); };
    const handleChange = (event: any) => { setName(event.target.value); };
    const handleSaveEdit = async () => {
        if (name === recipient?.fullName) { setIsEditMode(false); return; }
        const dataUp = { slug, idConversation: roomId, displayName: name, }
        const { data, error } = await updateDisplayName(dataUp);
        if (data) {
            setSnackbarMessage({ type: 'success', message: 'Chỉnh sửa thành công' }); setOpenSnackbar(true);
            router.push(`/message/${slug}`);
        }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
        setIsEditMode(false);
    }
    const handleClickProfile = () => { if (recipient?.slug) window.open(`/${recipient?.slug}`, '_blank'); }
    const handleConfimBlock = async () => {
        try {
            const { data, error } = await postBlock({ idUserBlock: recipient?._id })
            if (data) {
                setSnackbarMessage({ type: 'success', message: 'Success' });
                setOpenSnackbar(true); setIsBlock(true); setConfimOpenBlock(false);
            }
            if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
        } catch (e) { console.error(e) }
    }
    const handleConfimUnBlock = async () => {
        const { data, error } = await deleteBlock({ idUserBlock: recipient?._id })
        if (data) { setSnackbarMessage({ type: 'success', message: 'Success' }); setOpenSnackbar(true); setIsBlock(false); setConfimOpenBlock(false); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
    }
    const handleConfimDeleteChat = async () => {
        const { error } = await deleteMessageConversation(roomId);
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
        router.push('/message');
    }
    return (
        <>
            <Box sx={{
                width: { xs: '100%', sm: 400 }, height: '100vh',
                borderLeft: `1px solid ${borderColor}`,
                display: 'flex', flexDirection: 'column',
            }}>
                <Box sx={{ height: 80, display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: `1px solid ${borderColor}` }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 20, color: textColorPrimary }}>{locales[lang]?.message?.detailMessage?.Detail}</Typography>
                </Box>

                <Box sx={{ height: 80, display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: `1px solid ${borderColor}`, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <NotificationsIcon sx={{ marginRight: 1, color: textColorPrimary }} />
                        <Typography sx={{ fontWeight: 500, fontSize: 20, color: textColorPrimary }}>{locales[lang]?.message?.detailMessage?.MuteMessages}</Typography>
                    </Box>
                    <Switch />
                </Box>

                <Box sx={{ height: 80, display: 'flex', padding: '0 20px', borderBottom: `1px solid ${borderColor}`, flexDirection: 'column' }} >
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '16px', color: textColorPrimary }}>
                            {isEditMode ? <>{locales[lang]?.message?.detailMessage?.Editing}</> : <>{locales[lang]?.message?.detailMessage?.DisplayName}</>}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mt: '5px' }}>
                        <TextField value={name} onChange={handleChange} disabled={!isEditMode} variant="outlined" size="small" sx={{ width: 300, '& .MuiInputBase-input.Mui-disabled': { backgroundColor: boxColor, }, }} />
                        <IconButton onClick={isEditMode ? handleSaveEdit : handleToggleEdit}>
                            {isEditMode
                                ? <Tooltip title='save'><span><SaveIcon sx={{ color: textColorPrimary }} /></span></Tooltip>
                                : <Tooltip title='edit'><span><EditIcon sx={{ color: textColorPrimary }} /></span></Tooltip>
                            }
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ flex: 1, borderBottom: `1px solid ${borderColor}`, overflowY: 'auto' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 15, marginBottom: 1, pl: '24px', pr: '24px', pt: '14px', color: textColorPrimary }}>{locales[lang]?.message?.detailMessage?.Member}</Typography>
                    <Box sx={{ width: '100%', height: 72, pl: '20px', display: 'flex', alignItems: 'center', transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: boxColor, cursor: 'pointer' } }}
                        onClick={handleClickProfile}
                    >
                        <Box sx={{ mr: '10px' }}>
                            <Avatar src={recipient?.avatar || '/static/avt_default.png'} alt="avatar" sx={{ height: 50, width: 50, border: `0.5px solid ${borderColor}` }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 800, color: textColorPrimary }}>{recipient?.slug}</Typography>
                            <Typography sx={{ color: textColorSecondary }}>{recipient?.fullName}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ height: 150, borderTop: `1px solid ${borderColor}`, display: 'flex', alignItems: 'flex-start', flexDirection: 'column', p: '8px 24px' }}>
                    <Box sx={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', color: 'red', cursor: 'pointer' }}>{locales[lang]?.message?.detailMessage?.Report}</Box>
                    <Box sx={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', color: 'red', cursor: 'pointer' }} onClick={() => setConfimOpenBlock(true)}>
                        {isBlock ? <>{locales[lang]?.message?.detailMessage?.UnBlock}</> : <>{locales[lang]?.message?.detailMessage?.Block}</>}
                    </Box>
                    <Box sx={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', color: 'red', cursor: 'pointer' }} onClick={() => setConfimDeleteChat(true)}>{locales[lang]?.message?.detailMessage?.DeleteChat}</Box>
                </Box>
            </Box>

            <Modal open={confimOpenBlock} onClose={() => setConfimOpenBlock(false)} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 250, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 150, p: 2 }}>
                            <Typography id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>{`${isBlock ? 'UnBlock' : 'Block'} ${recipient?.fullName}`}</Typography>
                            <Typography id="confirm-close-modal-description" style={{ margin: 0, color: 'gray', fontSize: 15, fontWeight: 600, textAlign: 'center' }}>
                                {isBlock
                                    ? <>{recipient?.fullName} {locales[lang]?.message?.detailMessage?.captionBlock1}</>
                                    : <>{locales[lang]?.message?.detailMessage?.captionBlock2}</>
                                }
                            </Typography>
                        </Box>
                        <Box>
                            <Box sx={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, height: 50, display: 'flex', justifyContent: 'center' }}>
                                {isBlock
                                    ? <ButtonBase onClick={handleConfimUnBlock} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{locales[lang]?.message?.detailMessage?.UnBlock}</ButtonBase>
                                    : <ButtonBase onClick={handleConfimBlock} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{locales[lang]?.message?.detailMessage?.Block}</ButtonBase>
                                }
                            </Box>
                            <Box sx={{ height: 50, display: 'flex', justifyContent: 'center' }}>
                                <ButtonBase onClick={() => setConfimOpenBlock(false)} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{locales[lang]?.message?.detailMessage?.cancel}</ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Modal open={confimOpenDeleteChat} onClose={() => setConfimDeleteChat(false)} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 200, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 150, p: 2 }}>
                            <Typography id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>{locales[lang]?.message?.detailMessage?.PermanentlyDeleteChat}</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', height: 50, display: 'flex', justifyContent: 'center' }}>
                                <ButtonBase onClick={handleConfimDeleteChat} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{locales[lang]?.message?.detailMessage?.DeleteChat}</ButtonBase>
                            </Box>
                            <Box sx={{ height: 50, display: 'flex', justifyContent: 'center' }}>
                                <ButtonBase onClick={() => setConfimDeleteChat(false)} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{locales[lang]?.message?.detailMessage?.cancel}</ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
