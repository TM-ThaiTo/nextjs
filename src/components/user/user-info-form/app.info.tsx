'use client'

import React, { useState, useMemo } from "react"
import { Settings } from "@mui/icons-material";
import { Avatar, Button, IconButton, useMediaQuery } from "@mui/material";
import { UProfileType } from "@/types/user";
import { Box, Typography } from "@mui/material";
// import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { useRouter } from "@/utils/hooks/router/useRouter";
import { action_AddFollow, action_UnFollow } from "@/actions/user/actions";

import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

type InfoPropProfile = {
    myUser: any;
    data: UProfileType;
    auth: any;
}

export const Profile = ({ myUser, data, auth }: InfoPropProfile) => {
    const { _id: idAuthorProfile } = data;
    const { _id: idMyUser } = myUser;
    const { lang, locales, useThemeColors } = importThemeAndLanguge();

    const router = useRouter();
    const { isMe, isFollow } = auth;
    const [followUser, setFollowUser] = useState<boolean>(isFollow);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpansion = React.useCallback(() => setIsExpanded((prev) => !prev), []);
    const maxLength = 50;
    const { textColorPrimary, textColorSecondary, borderColor, actionActiveColor } = useThemeColors();
    const isMobile = useMediaQuery("(max-width: 767px)");

    const handleSetting = () => router.push('/account/edit')

    const handleFollow = async () => {
        const dataC = { id: idMyUser, idFollow: idAuthorProfile };
        const { data, error } = await action_AddFollow(dataC);
        if (data) setFollowUser(true);
        if (error) return;
    }

    const handleUnfollow = async () => {
        const dataC = { id: idMyUser, idFollow: idAuthorProfile };
        const { data, error } = await action_UnFollow(dataC);
        if (data) setFollowUser(false);
        if (error) return;
    }

    const renderSeting = () => {
        return (
            <div style={{ display: 'flex' }}>
                {isMe ? (
                    <>
                        <Button onClick={handleSetting}
                            sx={{
                                maxWidth: 220, borderRadius: '10px', fontSize: '12px', fontWeight: 800, px: 2,
                                backgroundColor: actionActiveColor,
                                color: textColorPrimary,
                                '&:hover': { backgroundColor: borderColor, },
                            }}>
                            {locales[lang]?.profile.editProfile}
                        </Button>
                        <IconButton><Settings style={{ color: textColorPrimary }} /></IconButton>
                    </>
                ) : (
                    <>
                        {followUser
                            ? <Button
                                onClick={handleUnfollow}
                                sx={{
                                    maxWidth: 220, borderRadius: '10px', fontSize: '12px', fontWeight: 800, px: 2,
                                    backgroundColor: actionActiveColor,
                                    color: textColorPrimary,
                                    '&:hover': { backgroundColor: borderColor, },
                                }}>   {locales[lang]?.profile.actionUnFollow}</Button>
                            : <Button
                                onClick={handleFollow}
                                sx={{
                                    maxWidth: 220, borderRadius: '10px', fontSize: '12px', fontWeight: 800, px: 2,
                                    backgroundColor: actionActiveColor,
                                    color: textColorPrimary,
                                    '&:hover': { backgroundColor: borderColor, },
                                }}>{locales[lang]?.profile.actionFollow}</Button>}
                        <IconButton><Settings style={{ color: textColorPrimary }} /></IconButton>
                    </>
                )}
            </div>
        )
    }
    const renderAvatar = () => {
        return (
            <Box sx={{ width: 300, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    src={data?.avatar || '/static/avt_default.png'}
                    alt={data?.avatar ? 'User Avatar' : 'Default Avatar'}
                    sx={{ width: 150, height: 150, objectFit: 'cover', border: '1px solid black', borderRadius: '50%' }}
                />
            </Box>
        )
    }
    const renderNameAndSlug = () => {
        return (
            <Box sx={{ display: 'flex', width: '100%', height: 60, justifyContent: 'space-between', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', width: '100%', height: 40, justifyContent: 'space-between', }}>
                    <Box sx={{ maxWidth: 200, height: 40, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography component='span' sx={{ fontWeight: 700, fontSize: '20px', color: textColorPrimary }}>{data.slug}</Typography>
                    </Box>
                    <Box sx={{ maxWidth: 300, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderSeting()}
                    </Box>
                </Box>
                <Box sx={{ height: 20 }}>
                    <Typography component='span' sx={{ fontWeight: 500, fontSize: '16px', color: textColorSecondary }}>{data.fullName}</Typography>
                </Box>
            </Box>
        )
    }
    const renderPostsFollowFollowing = () => {
        return (
            <Box sx={{ width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography component='span' sx={{ fontWeight: 700, fontSize: '17px' }}>
                        {data.posts}&#160;
                        <Typography component='span' style={{ fontWeight: 500, fontSize: '17px', color: textColorPrimary }}>
                            {locales[lang]?.profile.postsPopup}
                        </Typography>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component='span' sx={{ fontWeight: 700, fontSize: '17px' }}>
                        {data.follower}&#160;
                        <Typography component='span' style={{ fontWeight: 500, fontSize: '17px' }}>
                            {locales[lang]?.profile.followersPopup}
                        </Typography>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component='span' sx={{ fontWeight: 700, fontSize: '17px' }}>
                        {data.following}&#160;
                        <Typography component='span' style={{ fontWeight: 500, fontSize: '16px' }}>
                            {locales[lang]?.profile.followingPopup}
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        )
    }
    const renderBio = () => {
        return (
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Typography component='span' sx={{ fontWeight: 800 }}>Bio: </Typography>
                {isExpanded ? data.bio : data.bio?.substring(0, maxLength)}
                {data.bio && data.bio.length > maxLength && (
                    <Typography component='span'>
                        {isExpanded ? data.bio.substring(maxLength) : '...'}
                        <Button onClick={toggleExpansion} style={{ color: 'gray', fontWeight: 400, border: 'none', background: 'none', cursor: 'pointer' }}>
                            {isExpanded ? <> {locales[lang]?.profile.readLess}</> : <>{locales[lang]?.profile.readMore}</>}
                        </Button>
                    </Typography>
                )}
            </Box>
        )
    }

    return (
        <section>
            <Box sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px',
                flexDirection: isMobile ? 'column' : 'row',
            }}>
                <Box sx={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : 935,
                    height: 'auto',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                }}>
                    {renderAvatar()}
                    <Box sx={{
                        width: '100%',
                        maxWidth: isMobile ? '100%' : 500,
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: isMobile ? '20px 10px' : 0,
                    }}>
                        {renderNameAndSlug()}
                        <Box sx={{ width: '100%', height: 'auto' }}>
                            {renderPostsFollowFollowing()}
                            {renderBio()}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}