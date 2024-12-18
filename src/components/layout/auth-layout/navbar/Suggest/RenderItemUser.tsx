import React, { useRef, useState } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import PopupProfile from "@/components/post/render/popup-profile";
import { IOnePost } from "@/types/post";
import { action_AddFollow, action_UnFollow, getProfileUser } from "@/actions/user/actions";
import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

type Props = {
    item: any;
    myUser: any;
    isNotifacationPage?: boolean;
}

export default function ItemUserSuggest({ item, myUser, isNotifacationPage }: Props) {
    const [infoData, setDataPost] = useState<IOnePost>(item);
    const { user, auth, post } = infoData;
    const { useThemeColors, lang, locales } = importThemeAndLanguge();
    const { textColorPrimary, textColorSecondary, backgroundColor, tooltipBackgroundColor, toolTipTextColor, borderColor, linkColor, } = useThemeColors();
    const [isFollow, setIsFollow] = useState<boolean>(auth?.isFollow);
    const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false);
    const [infoAuthorPost] = useState<any>(user);
    const [authPost, setAuthPost] = useState<any>(auth);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isHoveringPopup, setIsHoveringPopup] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [dataInfo, setDataInfo] = useState<any>(null);

    const handleFollow = async () => {
        if (!myUser) { return; }
        const dataC = { id: myUser?._id, idFollow: infoAuthorPost?._id };
        setIsLoadingFollow(true);
        const { data, error } = await action_AddFollow(dataC);
        if (error) { setIsLoadingFollow(false); return; }
        if (data) {
            setIsFollow(true);
            setIsLoadingFollow(false);
        }
    };
    const handleUnFollowUser = async () => {
        if (!myUser) { return; }
        const dataC = { id: myUser?._id, idFollow: infoAuthorPost?._id };
        setIsLoadingFollow(true);
        const { data, error } = await action_UnFollow(dataC);
        if (error) { setIsLoadingFollow(false); return; }
        if (data) {
            setIsFollow(false);
            setIsLoadingFollow(false);
        }
    }
    const handleGetDataInfo = async () => {
        const { data, error } = await getProfileUser(user?.slug);
        if (error) return null;
        if (data) { setDataInfo(data); return data; }
        return null;
    }
    const handleSetPopup = (e: React.MouseEvent<HTMLElement>) => {
        if (isNotifacationPage) {
            if (!e.currentTarget) return;
            const rect = e.currentTarget.getBoundingClientRect(); // Get dimensions of hovered element
            const popupHeight = 330; // Popup height
            const popupWidth = 366; // Popup width
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Calculate top position: either below or above the element
            let top = rect.bottom + window.scrollY; // Default: below the element
            if (screenHeight - rect.bottom < popupHeight) { // Not enough space below
                top = rect.top + window.scrollY - popupHeight; // Move above
            }
            // Calculate left position: ensure it fits within the viewport
            let left = rect.left + window.scrollX; // Align with the left of the element
            if (screenWidth - rect.left < popupWidth) { // Not enough space on the right
                left = screenWidth - popupWidth - 10; // Move leftwards
            }
            setPosition({ top, left });
            setPopupOpen(true);
            setIsHoveringPopup(true);
        } else {
            if (!e.currentTarget) { return }
            const rect = e.currentTarget.getBoundingClientRect();
            const screenHeight = window.innerHeight;
            const boxHeight = 330;
            const availableSpaceBelow = screenHeight - (rect.bottom + boxHeight);
            const availableSpaceAbove = rect.top - boxHeight;
            let top;
            if (availableSpaceBelow < 0 && availableSpaceAbove >= 0) top = rect.top + window.scrollY - boxHeight;
            else top = rect.top + window.scrollY + rect.height;
            const left = 10;
            setPosition({ top, left });
            setPopupOpen(true);
            setIsHoveringPopup(true)
        }

    };
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
    const renderFollowButton = () => {
        return (
            <>
                {isLoadingFollow
                    ? <CircularProgress size={20} sx={{ ml: 1 }} />
                    : <Typography component="span" variant="body2" sx={{ fontWeight: 600, fontSize: 15, ml: 1, color: 'blue', cursor: 'pointer' }}>
                        <>
                            {!isFollow
                                ? <Box onClick={handleFollow}>
                                    <Typography sx={{ color: linkColor, fontSize: 13, fontWeight: 700 }}>
                                        {locales[lang]?.contacts?.follow}
                                    </Typography>
                                </Box>
                                : <Box onClick={handleUnFollowUser}>
                                    <Typography sx={{ color: '#262626', fontSize: 13, fontWeight: 700 }}>
                                        {locales[lang]?.contacts?.following}
                                    </Typography>
                                </Box>
                            }
                        </>
                    </Typography>
                }
            </>
        )
    };
    return (
        <>

            <Box sx={{ width: '100%', p: 1, display: 'flex', alignItems: 'center', height: 60 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => handleGetPopupProfile(e)} onMouseLeave={handleClosePopupProfile} >
                    {renderImageAvatar()}
                </Box>
                <Box sx={{ ml: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} onMouseEnter={(e) => handleGetPopupProfile(e)} onMouseLeave={handleClosePopupProfile}>
                        <Link href={`/${user?.slug}`} style={{ textDecoration: 'none' }} >
                            <Typography component="span" variant="body1" sx={{ fontWeight: 700, fontSize: 14, color: textColorPrimary }}>
                                {user?.slug}
                            </Typography>
                        </Link>
                        <Typography sx={{ fontWeight: 700, fontSize: 13, color: textColorSecondary }}>{user?.fullName}</Typography>
                    </Box>
                    {renderFollowButton()}
                </Box>
            </Box>
            {popupOpen && (
                <Box
                    ref={boxRef}
                    onMouseEnter={() => setPopupOpen(true)}
                    onMouseLeave={handleClosePopupProfile}
                    sx={{
                        top: position.top,
                        left: position.left,
                        position: 'absolute',
                        zIndex: 10000,
                        width: 366,
                        height: 330,
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
        </>
    )
}