'use client';

import { useState } from 'react';
// material
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ButtonBase from "@mui/material/ButtonBase";
import Modal from "@mui/material/Modal";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';
import { AiFillPushpin } from "react-icons/ai";
import SettingsIcon from '@mui/icons-material/Settings';
// action
import { leaveGroup, updateDisplayName } from '@/actions/chat/p2p/user-conversation/actions';
import { deleteMessageConversation } from '@/actions/chat/p2p/conversation/actions';
// style
import { style_avatar_myuser, style_avatar_owner, style_total_member, } from '@/style/style_mui/message'
// component
import SeeAllMemberDetailGroupMessage from './see.all.member';
import RenderMember from './render.member';
// hook
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { useRouter } from '@/utils/hooks/router/useRouter';
import AddMember from './modal.add.member';
import { FaUserPlus } from 'react-icons/fa';
import SettingGroup from './setting.group';

type Props = {
    data: any;
};

const style_Actions_Group = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 70,
    borderRadius: '50%',
    cursor: 'pointer'
}

export default function DetailMessageGroup({ data }: Props) {
    const { auth, conversation, user } = data;
    const { myUser, owner, members } = user;
    const { idConversation: roomId, slug, displayName, notification, totalMember } = conversation;
    const avatarOwner = owner?.avatar;
    const avatarMyUser = myUser?.avatar === avatarOwner ? members[0]?.avatar : myUser?.avatar;

    const router = useRouter();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    const [confimLeaveGroup, setConfimLeaveGroup] = useState<boolean>(false);
    const [confimOpenDeleteChat, setConfimDeleteChat] = useState<boolean>(false);
    const [isNotification, setIsNotification] = useState<number>(notification);
    const [isPin, setIsPin] = useState<number>(0);
    const [openAddMember, setOpenAddMember] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>(displayName || '');
    const [isSeeAllMember, setIsSeeAllMember] = useState<boolean>(false);
    const [isSetting, setIsSetting] = useState<boolean>(false);

    const handleCloseAddMember = () => setOpenAddMember(false);
    const handleOpenAddMember = () => setOpenAddMember(true);
    const handleOpenSeeAllMember = () => { setIsSetting(false); setIsSeeAllMember((prev) => !prev); };
    const handleOpenSetting = () => { setIsSeeAllMember(false); setIsSetting((prev) => !prev); };
    const handleToggleEdit = () => { setIsEditMode((prev) => !prev); };
    const handleChange = (event: any) => { setName(event.target.value); };
    const handleSaveEdit = async () => {
        const dataUp = { slug, idConversation: roomId, displayName: name }
        const { data, error } = await updateDisplayName(dataUp);
        if (data) { setSnackbarMessage({ type: 'success', message: data?.message }); setOpenSnackbar(true); setIsEditMode(false); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
    }
    const handleConfimDeleteChat = async () => {
        const { data, error } = await deleteMessageConversation(roomId);
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
        if (data) router.push('/message/groups');
    }
    const handleConfimLeaveGroup = async () => {
        const dataUp = { slug, idConversation: roomId, displayName: name }
        const { data, error } = await leaveGroup(dataUp);
        if (data) { setSnackbarMessage({ type: 'success', message: data?.message }); setOpenSnackbar(true); setIsEditMode(false); router.push('/message/groups'); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
    }
    const handleMute = () => { setIsNotification((prev) => prev === 1 ? 0 : 1); }
    const handlePin = () => setIsPin((prev) => prev === 1 ? 0 : 1);

    const renderAction = () => {
        return (
            <Box sx={{ height: 175, borderBottom: '1px solid gray' }}>
                <Box sx={{ height: 60, width: '100%', padding: '0 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', pt: '10px', }}>
                    <Stack direction="row" spacing={-1} sx={{ position: 'relative', width: 60, height: 60 }} >
                        <Avatar src={avatarOwner || '/static/avt_default.png'} alt="Owner Avatar" sx={style_avatar_owner} />
                        <Avatar src={avatarMyUser || '/static/avt_default.png'} alt="Member Avatar" sx={style_avatar_myuser} />
                        <Avatar sx={style_total_member}>
                            {totalMember > 100 ? '99+' : `+${totalMember - 2}`}
                        </Avatar>
                    </Stack>
                </Box>

                <Box sx={{ height: 50, display: 'flex', padding: '0 20px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography
                        sx={{
                            height: 40,
                            fontWeight: 800,
                            maxWidth: 300,
                            fontSize: '17px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                        }}
                    >
                        {displayName}
                    </Typography>
                </Box>
                <Box sx={{ height: 60, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Box sx={style_Actions_Group} onClick={handleMute}  >
                        {isNotification === 1
                            ? <NotificationsNoneIcon sx={{ fontSize: 28, color: '#37474F' }} />
                            : <NotificationsOffIcon sx={{ fontSize: 28, color: '#37474F' }} />
                        }
                        <Typography sx={{ marginTop: '5px', fontWeight: 600, fontSize: '11px', textAlign: 'center' }}>
                            {isNotification ? 'Mute' : 'Unmute'}
                        </Typography>
                    </Box>

                    <Box sx={style_Actions_Group} onClick={handlePin} >
                        <AiFillPushpin style={{ fontSize: 28, color: '#37474F', transform: isPin === 1 ? 'rotate(45deg)' : '' }} />
                        <Typography sx={{ marginTop: '5px', fontWeight: 600, fontSize: '11px', textAlign: 'center' }}>
                            {isPin ? 'Pin' : 'Unpin'}
                        </Typography>
                    </Box>

                    <Box sx={style_Actions_Group} onClick={handleOpenAddMember} >
                        <FaUserPlus style={{ fontSize: 28, color: '#37474F' }} />
                        <Typography sx={{ marginTop: '5px', fontWeight: 600, fontSize: '11px', textAlign: 'center' }}>
                            Add Members
                        </Typography>
                    </Box>

                    <Box sx={style_Actions_Group} onClick={handleOpenSetting}>
                        <SettingsIcon sx={{ fontSize: 28, color: '#37474F' }} />
                        <Typography sx={{ marginTop: '5px', fontWeight: 600, fontSize: '11px', textAlign: 'center' }}>
                            Manage
                        </Typography>
                    </Box>
                </Box>
            </Box>

        )
    }
    const renderEdit = () => {
        return (
            <Box sx={{ height: 90, display: 'flex', justifyContent: 'center', padding: '0 20px', borderBottom: '1px solid gray', flexDirection: 'column', backgroundColor: '#f9f9f9', }} >
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '16px' }}>
                        {isEditMode ? 'Editing:' : ' Display Name:'}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', mt: '5px' }}>
                    <TextField value={name} onChange={handleChange} disabled={!isEditMode} variant="outlined" size="small" sx={{ width: 300, '& .MuiInputBase-input.Mui-disabled': { backgroundColor: '#e0e0e0', }, }} />
                    <IconButton onClick={isEditMode ? handleSaveEdit : handleToggleEdit}>
                        {isEditMode
                            ? <Tooltip title='save'><span><SaveIcon sx={{ color: 'black' }} /></span></Tooltip>
                            : <Tooltip title='edit'><span><EditIcon sx={{ color: 'black' }} /></span></Tooltip>
                        }
                    </IconButton>
                </Box>
            </Box>
        )
    }
    const renderButtonReport_Learve_Delete = () => {
        return (
            <Box sx={{ height: 150, borderTop: '1px solid #e0e0e0', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', backgroundColor: '#fff', p: '8px 24px' }}>
                <Box sx={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', color: 'red', cursor: 'pointer' }}>
                    <ReportProblemIcon /> Report
                </Box>
                <Box sx={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', color: 'red', cursor: 'pointer' }}
                    onClick={() => setConfimLeaveGroup(true)}
                >
                    <LogoutIcon /> Leave Group
                </Box>
                <Box sx={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', color: 'red', cursor: 'pointer' }}
                    onClick={() => setConfimDeleteChat(true)}
                >
                    <DeleteForeverIcon /> Delete Chat
                </Box>
            </Box>
        )
    }
    return (
        <>
            <Box sx={{
                width: { xs: '100%', sm: 400 }, height: '100vh',
                borderRight: '1px solid #e0e0e0',
                display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9'
            }}>
                {isSeeAllMember && !isSetting && <SeeAllMemberDetailGroupMessage data={data} onClickBackMain={handleOpenSeeAllMember} />}
                {!isSeeAllMember && isSetting && <SettingGroup onClickBackMain={handleOpenSetting} />}
                {!isSeeAllMember && !isSetting &&
                    <>
                        <Box sx={{ height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid gray' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Group Info</Typography>
                        </Box>
                        {renderAction()}
                        {renderEdit()}
                        <RenderMember conversation={conversation} user={user} auth={auth} onClickSeeAll={handleOpenSeeAllMember} />
                        {renderButtonReport_Learve_Delete()}
                    </>
                }
            </Box>

            {confimLeaveGroup &&
                <Modal open={confimLeaveGroup} onClose={() => setConfimLeaveGroup(false)} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                    <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 250, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 150, p: 2 }}>
                                <Typography id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>Leave Group</Typography>
                                <Typography id="confirm-close-modal-description" style={{ margin: 0, color: 'gray', fontSize: 15, fontWeight: 600, textAlign: 'center' }}>
                                    <>Viego Blum and other accounts they may have or create will now be able to request to follow and message you on Instagram. They won&apos;t be notified that you unblocked them.</>
                                </Typography>
                            </Box>
                            <Box sx={{ height: 105 }}>
                                <Box sx={{ height: 50, borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'center' }}>
                                    <ButtonBase onClick={handleConfimLeaveGroup} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                        Leave Group
                                    </ButtonBase>
                                </Box>
                                <Box sx={{ height: 50, display: 'flex', justifyContent: 'center' }}>
                                    <ButtonBase onClick={() => setConfimLeaveGroup(false)} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Cancel</ButtonBase>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            }
            {confimOpenDeleteChat &&
                <Modal open={confimOpenDeleteChat} onClose={() => setConfimDeleteChat(false)} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                    <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 200, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 150, p: 2 }}>
                                <Typography id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>Permanently delete chat?</Typography>
                            </Box>
                            <Box>
                                <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', height: 50, display: 'flex', justifyContent: 'center' }}>
                                    <ButtonBase onClick={handleConfimDeleteChat} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Delete Chat</ButtonBase>
                                </Box>
                                <Box sx={{ height: 50, display: 'flex', justifyContent: 'center' }}>
                                    <ButtonBase onClick={() => setConfimDeleteChat(false)} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Cancel</ButtonBase>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            }
            {openAddMember && <AddMember open={openAddMember} onClose={handleCloseAddMember} conversation={conversation} />}

        </>
    );
}
