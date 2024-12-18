'use client'
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { logoutAction } from '@/actions/auth/actions';
import { style_avatar_myuser, style_avatar_owner } from '@/style/style_mui/message';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import RenderSuggested from './Suggest/RenderSuggest';
import NewMessageModal from '@/components/message/main/modal.new.message';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    myUser: any;
    conversations?: any,
    dataGroup?: any,
    suggestedUser?: any,
}
export const Contacts = ({ myUser, conversations, dataGroup, suggestedUser }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { useThemeColors, lang, locales } = importThemeAndLanguge();
    const { textColorPrimary, textColorSecondary, borderColor, linkColor, actionHoverColor, boxColor } = useThemeColors();
    const isDesktop = useMediaQuery("(min-width: 1650px)");
    if (!isDesktop) return null;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            const { data, error } = await logoutAction();
            if (error) return;
            if (data) signOut({ callbackUrl: "/auth/login" });
        } else console.log('User cancelled logout');
    }
    const renderInfo = () => {
        const { avatar, fullName, slug } = myUser;
        return (
            <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
                <Link href={`/${slug}`} style={{ width: 350, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <div style={{ height: '100%', width: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src={avatar || '/static/avt_default.png'} alt='avatar' sx={{ height: 50, width: 50, borderRadius: '50%', border: `1px solid ${borderColor}` }} />
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: 300 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, color: textColorPrimary, alignSelf: 'flex-start', }}>{slug}</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, color: textColorSecondary, alignSelf: 'flex-start', }}>{fullName}</Typography>
                    </Box>
                </Link>
                <Box sx={{ width: 100 }}>
                    <Typography onClick={handleLogout} sx={{ color: linkColor, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                        {locales[lang]?.auth.logout}
                    </Typography>
                </Box>
            </Box>
        )
    }
    const renderContacts = () => {
        return (
            <>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: textColorSecondary }}>{locales[lang]?.contacts?.contact}</Typography>
                <div style={{ overflowY: 'scroll', height: '100%', maxHeight: 290, marginTop: '5px' }}>
                    <div style={{ marginTop: '5px', width: '100%', height: 270, minHeight: 100, maxHeight: '100%', paddingRight: '5px' }}>
                        {conversations || conversations?.length > 0 ?
                            <>
                                {conversations?.map((item: any, index: any) => {
                                    const { slug } = item?.conversation;
                                    const { avatar, fullName } = item?.otherUser;
                                    return (
                                        <div key={index}>
                                            <Box sx={{
                                                height: 55, display: 'flex',
                                                alignItems: 'center', width: '100%', borderRadius: '10px', cursor: 'pointer',
                                                '&:hover': { backgroundColor: actionHoverColor }
                                            }}>
                                                <Link href={`/message/${slug}`} style={{ height: 50, display: 'flex', alignItems: 'center', width: '100%', borderRadius: '10px', cursor: 'pointer', textDecoration: 'none', }}>
                                                    <>
                                                        <div style={{ height: '100%', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Avatar src={avatar || '/static/avt_default.png'} alt='avatar' sx={{ height: 40, width: 40, borderRadius: '50%', border: `1px solid ${borderColor}` }} />
                                                        </div>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: '100%' }}>
                                                            <Typography sx={{ fontWeight: 700, fontSize: 14, color: textColorPrimary, alignSelf: 'flex-start', }}>{fullName}</Typography>
                                                        </Box>
                                                    </>
                                                </Link>
                                            </Box>
                                        </div>
                                    )
                                })}
                            </>
                            : <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{
                                    height: 55, display: 'flex',
                                    alignItems: 'center', width: '100%', borderRadius: '10px', cursor: 'pointer',
                                    '&:hover': { backgroundColor: actionHoverColor },
                                    p: 1
                                }} onClick={handleOpen}>
                                    <Avatar sx={{
                                        height: 40, width: 40, borderRadius: '50%', border: `1px solid ${borderColor}`,
                                        backgroundColor: boxColor
                                    }}>
                                        <AddIcon sx={{ color: textColorPrimary }} />
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 700, fontSize: 15, color: textColorPrimary, ml: 1 }}>
                                        {locales[lang]?.message?.SendMessage}
                                    </Typography>
                                </Box>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
    const renderGroupChats = () => {
        return (
            <>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: textColorSecondary }}>{locales[lang]?.contacts?.groupChat}</Typography>
                <div style={{ overflowY: 'scroll', height: '100%', maxHeight: 290, marginTop: '5px', width: '100%', }}>
                    <div style={{ marginTop: '5px', width: '100%', height: 270, minHeight: 100, maxHeight: '100%' }}>
                        {dataGroup.length > 0
                            ? <>
                                {dataGroup?.map((item: any, index: any) => {
                                    const { room, myUser, owner } = item;
                                    const { slug, displayName, totalMember } = room;
                                    const { avatar } = myUser;
                                    const { avatarOwner } = owner;
                                    return (
                                        <div key={index}>
                                            <Box sx={{
                                                height: 70, display: 'flex', pl: 1,
                                                alignItems: 'center', borderRadius: '10px', cursor: 'pointer', '&:hover': { backgroundColor: actionHoverColor }
                                            }}>
                                                <Link href={`/message/groups/${slug}`} style={{ height: 50, display: 'flex', alignItems: 'center', width: '100%', borderRadius: '10px', cursor: 'pointer', textDecoration: 'none', }}>
                                                    <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                                                        <Stack direction="row" spacing={-1} sx={{ position: 'relative', width: 60, height: 60 }} >
                                                            <Avatar src={avatarOwner || '/static/avt_default.png'} alt="Owner Avatar" sx={{ ...style_avatar_owner, border: `2px solid ${borderColor}` }} />
                                                            <Avatar src={avatar || '/static/avt_default.png'} alt="Member Avatar" sx={{ ...style_avatar_myuser, border: `2px solid ${borderColor}` }} />
                                                            <Avatar sx={{
                                                                width: 32, height: 32,
                                                                backgroundColor: '#b8b8b8',
                                                                fontSize: '0.75rem',
                                                                fontWeight: 'bold',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 32,
                                                                zIndex: 1, border: `2px solid ${borderColor}`,
                                                                color: textColorPrimary
                                                            }} >
                                                                {totalMember > 100 ? '99+' : `+${totalMember - 2}`}
                                                            </Avatar>
                                                        </Stack>
                                                    </ListItemAvatar>
                                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                                        <Typography component="span" fontWeight="bold" sx={{ ml: 1, maxWidth: 250, overflow: 'hidden', fontWeight: 700, fontSize: 14, textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColorPrimary }} >
                                                            {displayName}
                                                        </Typography>
                                                    </Box>
                                                </Link>
                                            </Box>
                                        </div>
                                    )
                                })}
                            </>
                            : <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{
                                    height: 55, display: 'flex',
                                    alignItems: 'center', width: '100%', borderRadius: '10px', cursor: 'pointer',
                                    '&:hover': { backgroundColor: actionHoverColor },
                                    p: 1
                                }} onClick={handleOpen}>
                                    <Avatar sx={{
                                        height: 40, width: 40, borderRadius: '50%', border: `1px solid ${borderColor}`,
                                        backgroundColor: boxColor
                                    }}>
                                        <AddIcon sx={{ color: textColorPrimary }} />
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 700, fontSize: 15, color: textColorPrimary, ml: 1 }}>
                                        {locales[lang]?.message?.messageGroup?.CreateGroup}
                                    </Typography>
                                </Box>
                            </div>
                        }
                    </div >
                </div >
            </>
        )
    }
    return (
        <div style={{ width: '25%', position: 'fixed', right: 0, top: 0, height: '100vh', overflowY: 'auto', }} >
            <div style={{ height: '100vh', width: '350px', }}>
                <div style={{ padding: '5px', height: 70, width: '100%', }}>
                    {renderInfo()}
                </div>

                <div style={{ paddingLeft: '5px', height: '100%', minHeight: 100, maxHeight: 370, width: '100%', borderBottom: `1px solid ${borderColor}`, marginTop: '10px' }}>
                    <RenderSuggested myUser={myUser} suggestedUser={suggestedUser} />
                </div>

                <div style={{ paddingLeft: '5px', height: '100%', minHeight: 100, maxHeight: 320, width: '100%', marginTop: '10px', borderBottom: `1px solid ${borderColor}`, }}>
                    {renderContacts()}
                </div>

                <div style={{ height: '100%', minHeight: 100, maxHeight: 320, width: '100%', borderBottom: `1px solid ${borderColor}`, marginTop: '10px' }}>
                    {renderGroupChats()}
                </div>
                <div style={{ padding: 10, fontWeight: 700, width: '100%', height: '50px', display: 'flex' }}>
                    <Typography sx={{ color: textColorSecondary, fontWeight: 700, }}>© 2024 Copyright by </Typography>
                    <Typography sx={{ fontWeight: 700, ml: 1 }}>
                        <a href="https://www.facebook.com/to.trinh.520900" target="blank" style={{ textDecoration: 'none', color: linkColor }}>Alex Trinh</a>
                    </Typography>
                </div>
            </div>
            {open && <NewMessageModal open={open} onClose={handleClose} />}
        </div>
    )
}