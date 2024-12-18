'use client'
import React, { useRef, useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PublicIcon from '@mui/icons-material/Public';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PopupProfile from "@/components/post/render/popup-profile";
import ShareIcon from '@mui/icons-material/Share';
import { ModalHandlePost } from "@/components/modal/handle-post";
import { handleAddFollow } from "@/components/user/user-info-form/handle/follow-handle";
import ModalLogin from "@/components/auth/modal/modal-login";
import { IOnePost } from "@/types/post";
import { formatFullDate, formatTimeDifference } from "@/helper/formatTime";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getProfileUser } from "@/actions/user/actions";

type NameAndAvtProps = {
    data: IOnePost,
    myUser: any,
};

export default function RenderNameAndAvt({ data, myUser }: NameAndAvtProps) {
    const [infoData, setDataPost] = useState<IOnePost>(data);
    const { user, auth, post } = infoData;
    const { textColorPrimary, textColorSecondary, backgroundColor, tooltipBackgroundColor, toolTipTextColor, borderColor, linkColor, } = useThemeColors();
    const [setAlert] = useState<any>({ open: false, type: 'info', message: '' });
    const [isFollow, setIsFollow] = useState<boolean>(auth?.isFollow);
    const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false);
    const [infoAuthorPost] = useState<any>(user);
    const [authPost, setAuthPost] = useState<any>(auth);
    const [openModalPost, setOpenModalPost] = useState<boolean>(false);
    const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isHoveringPopup, setIsHoveringPopup] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [dataInfo, setDataInfo] = useState<any>(null);

    const handleCloseModal = () => setOpenModalPost(false);
    const handleCloseModalLogin = () => setOpenModalLogin(false);
    const handleFollow = async () => {
        if (!myUser) {
            setOpenModalLogin(true);
            return;
        }
        const data = { id: myUser?.id, idFollow: infoAuthorPost?._id };
        await handleAddFollow(data, setAlert, setIsLoadingFollow);
        setIsFollow(true);
        setAuthPost((prevAuth: any) => ({
            ...prevAuth,
            isFollow: true,
        }));
    };
    const handleGetDataInfo = async () => {
        const { data, error } = await getProfileUser(user?.slug);
        if (error) return null;
        if (data) { setDataInfo(data); return data; }
        return null;
    }
    const handleSetPopup = (e: React.MouseEvent<HTMLElement>) => {
        if (!e.currentTarget) { return }
        const rect = e.currentTarget.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        const boxHeight = 330;
        const availableSpaceBelow = screenHeight - (rect.bottom + boxHeight);
        const availableSpaceAbove = rect.top - boxHeight;
        let top;
        if (availableSpaceBelow < 0 && availableSpaceAbove >= 0) top = rect.top + window.scrollY - boxHeight;
        else top = rect.top + window.scrollY + rect.height;
        const left = rect.left + window.scrollX;
        setPosition({ top, left });
        setPopupOpen(true);
        setIsHoveringPopup(true)
    }
    const handleGetPopupProfile = async (e: React.MouseEvent<HTMLElement>) => {
        if (!dataInfo) {
            const res = await handleGetDataInfo()
            if (res) handleSetPopup(e)
        } else handleSetPopup(e);
    };
    const handleClosePopupProfile = () => {
        if (isHoveringPopup) setPopupOpen(false);
        setPopupOpen(false);
    }
    const renderImageAvatar = () => (
        <Link href={`/${user?.slug}`}>
            <Avatar src={user?.avatar || '/static/avt_default.png'} alt='User' sx={{ width: 50, height: 50, objectFit: 'cover', border: `1px solid ${borderColor}`, }} />
        </Link>
    )
    const renderName = () => (
        <Link href={`/${user?.slug}`} style={{ textDecoration: 'none' }}>
            <Typography component="span" variant="body1" sx={{ fontWeight: 700, fontSize: 16, color: textColorPrimary }}>
                {user?.slug}
            </Typography>
        </Link>
    )
    const renderFollowButton = () => {
        return (
            !authPost?.isMe && !isFollow && (
                <>
                    <Typography component="span" variant="body1" sx={{ fontWeight: 700, ml: 1 }}>•</Typography>
                    {isLoadingFollow
                        ? <CircularProgress size={20} sx={{ ml: 1 }} />
                        : <Typography component="span" variant="body2" sx={{ fontWeight: 600, fontSize: 15, ml: 1, color: 'blue', cursor: 'pointer' }}>
                            <Box onClick={handleFollow}> follow </Box>
                        </Typography>
                    }
                </>
            ))
    };
    const renderPostInfo = () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={post?.type === 3 ? `/post/status/${post?.slug}` : `/post/${post?.slug}`} style={{ textDecoration: 'none' }}>
                <Tooltip
                    title={formatFullDate(post?.createdAt)}
                    componentsProps={{
                        tooltip: {
                            sx: { fontSize: 12, backgroundColor: tooltipBackgroundColor, color: toolTipTextColor, maxWidth: 'none', p: 1, },
                        },
                    }}
                >
                    <Typography component="span" variant="body2" sx={{ fontWeight: 600, fontSize: 15, ml: 1, color: textColorSecondary, textDecoration: 'none' }}>
                        {formatTimeDifference(post?.createdAt, 2)}
                    </Typography>
                </Tooltip>
            </Link>

            <Typography component="span" variant="body1" sx={{ fontWeight: 600, ml: 1 }}>•</Typography>
            {post?.status === 1 ? (
                <Tooltip title="Public"
                    componentsProps={{
                        tooltip: {
                            sx: { fontSize: 12, backgroundColor: tooltipBackgroundColor, color: toolTipTextColor },
                        },
                    }}>
                    <PublicIcon sx={{ fontSize: 20, ml: 1, color: textColorSecondary }} />
                </Tooltip>
            ) : post?.status === 2 ? (
                <Tooltip title="Private" componentsProps={{
                    tooltip: {
                        sx: { fontSize: 12, backgroundColor: tooltipBackgroundColor, color: toolTipTextColor },
                    },
                }}>
                    <LockPersonIcon sx={{ fontSize: 20, ml: 1, color: textColorSecondary }} />
                </Tooltip>
            ) : post?.status === 3 ? (
                <Tooltip title="Share" componentsProps={{
                    tooltip: {
                        sx: { fontSize: 12, backgroundColor: tooltipBackgroundColor, color: toolTipTextColor },
                    },
                }}>
                    <ShareIcon sx={{ fontSize: 20, ml: 1, color: textColorSecondary }} />
                </Tooltip>
            ) : <></>}
        </Box>
    );
    return (
        <>
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ maxWidth: 470, p: 1, display: 'flex', alignItems: 'center', height: 40 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => handleGetPopupProfile(e)} onMouseLeave={handleClosePopupProfile}>
                        {renderImageAvatar()}
                    </Box>
                    <div>
                        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => handleGetPopupProfile(e)} onMouseLeave={handleClosePopupProfile}>
                            {renderName()}
                            {authPost?.isMe && (
                                <>
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 700, ml: 1 }}>•</Typography>
                                    <Link href={`/${user?.slug}`} style={{ textDecoration: 'none' }}>
                                        <Typography component="span" variant="body2" sx={{ fontWeight: 600, fontSize: 15, ml: 1, color: linkColor, textDecoration: 'none' }}>
                                            author
                                        </Typography>
                                    </Link>
                                </>
                            )}
                            {renderFollowButton()}
                        </Box>
                        <Box sx={{ height: 20 }}>{renderPostInfo()}</Box>
                    </div>
                </Box>

                <Box sx={{ height: '100%', width: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton style={{ color: textColorPrimary }} onClick={() => setOpenModalPost(true)}>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
            </Box>
            {popupOpen && (
                <Box ref={boxRef}
                    onMouseEnter={() => setPopupOpen(true)}
                    onMouseLeave={handleClosePopupProfile}
                    sx={{
                        top: position.top, left: position.left,
                        position: 'absolute',
                        zIndex: 10, width: 366, height: 330,
                        backgroundColor: backgroundColor,
                        border: `1px solid ${borderColor}`,
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}
                >
                    <PopupProfile dataInfo={dataInfo} user={user} authPost={authPost} handleFollow={handleFollow} isLoadingFollow={isLoadingFollow} />
                </Box >
            )}
            {openModalPost && <ModalHandlePost open={openModalPost} handleClose={handleCloseModal} data={data} setDataPost={setDataPost} myUser={myUser} />}
            {openModalLogin && <ModalLogin open={openModalLogin} handleClose={handleCloseModalLogin} />}
        </>
    );
};