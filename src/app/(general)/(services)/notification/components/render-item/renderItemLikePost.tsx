'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { getShortTimeFormat } from '@/helper/formatTime';
import { putUpateIsRead } from '@/actions/notification/action';

type Props = {
    data: any;
    notification: any;
}

export default function RenderItemNotificationLikePost({ data, notification }: Props) {
    const { isRead, id, } = notification;
    const [isReadNotification, setIsReadNotification] = useState<boolean>(isRead);
    const router = useRouter();
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { textColorPrimary, actionHoverColor, textColorSecondary, linkColor } = useThemeColors();
    const { type, user, dataContent } = data;
    const { fullName, avatar } = user;
    const { createdAt, comments, likes, type: typePost, content, slug } = dataContent;

    const styleLikeCommentTime = { fontSize: 13, fontWeight: 600, color: !isReadNotification ? textColorPrimary : textColorSecondary }
    const styleDotLikeCommentTime = { fontWeight: 600, ml: 1, mr: 1, color: !isReadNotification ? textColorPrimary : textColorSecondary }

    const renderTypePost = (type: number) => {
        return (
            <>
                {type === 1 && <>{locales[lang]?.notificationPage?.post?.image}</>}
                {type === 2 && <>{locales[lang]?.notificationPage?.post?.video}</>}
                {type === 3 && <>{locales[lang]?.notificationPage?.post?.status}</>}
            </>
        )
    }


    const handleIsRead = async () => {
        const { data, error } = await putUpateIsRead({ id });
        if (data) { setIsReadNotification(true); router.push(typePost === 3 ? `/post/status/${slug}` : `/post/${slug}`) }
        if (error) router.push(typePost === 3 ? `/post/status/${slug}` : `/post/${slug}`)
        router.push(typePost === 3 ? `/post/status/${slug}` : `/post/${slug}`)
    }

    return (
        <Box onClick={handleIsRead} sx={{ height: 80, width: '100%', display: 'flex', alignItems: 'center', p: 1, cursor: 'pointer', '&:hover': { backgroundColor: actionHoverColor } }} >
            <Avatar src={avatar || '/static/avt_default.png'} alt='avatar' sx={{ width: 60, height: 60, }} />
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 1, width: '90%' }}>
                <Box sx={{ height: 'auto', maxHeight: 65, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 17, fontWeight: 700, color: !isReadNotification ? textColorPrimary : textColorSecondary }}>{fullName}</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 500, color: !isReadNotification ? textColorPrimary : textColorSecondary, ml: 1 }}>
                        {locales[lang]?.notificationPage?.post?.likedYour} {renderTypePost(typePost)} {locales[lang]?.notificationPage?.post?.you}
                    </Typography>
                </Box>
                <Box sx={{ height: 15, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={styleLikeCommentTime}>{getShortTimeFormat(createdAt, lang)}</Typography>
                    <Typography sx={styleDotLikeCommentTime}>•</Typography>
                    <Typography sx={styleLikeCommentTime}>{likes} likes</Typography>
                    <Typography sx={styleDotLikeCommentTime}>•</Typography>
                    <Typography sx={styleLikeCommentTime}>{comments} comments</Typography>
                </Box>
            </Box>
            {!isReadNotification && <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: linkColor, }} />}
        </Box>
    )
}