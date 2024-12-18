'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { deleteNotification, putUpateIsRead } from '@/actions/notification/action';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { getShortTimeFormat } from '@/helper/formatTime';
import { accept_follow } from '@/actions/follow/actions';

type Props = {
    data: any;
    notification?: any
}
export default function RenderItemRequsetFollow({ data, notification }: Props) {
    const { isRead, id, time } = notification;
    const { user } = data;
    const { _id, fullName, avatar, slug } = user;
    const router = useRouter();
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { textColorPrimary, actionHoverColor, textColorSecondary, borderColor } = useThemeColors();
    const [isReadNotification, setIsReadNotification] = useState<boolean>(isRead);

    const handleIsRead = async () => {
        if (isReadNotification) router.push(`/${slug}`);
        else {
            const { data, error } = await putUpateIsRead({ id });
            if (data) { setIsReadNotification(true); router.push(`/${slug}`) }
            if (error) { setIsReadNotification(false); router.push(`/${slug}`) }
        }
    }

    const handleReject = async () => {
        const dto = { id };
        await deleteNotification(dto);
    }

    const handleAccept = async () => {
        const dto = { id: _id };
        await accept_follow(dto);
    }

    return (
        <Box
            sx={{
                height: 80, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, cursor: 'pointer', borderRadius: 2, gap: 2,
                backgroundColor: isReadNotification ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
                '&:hover': { backgroundColor: actionHoverColor, },
            }}
        >
            <Link href={`/${slug}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flex: 1, overflow: 'hidden', }} >
                <Avatar onClick={handleIsRead} src={avatar || '/static/avt_default.png'} alt="avatar" sx={{ width: 60, height: 60, border: `1px solid ${borderColor}` }} />
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 2, overflow: 'hidden', }} >
                    <Typography
                        sx={{
                            fontSize: 17, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            color: !isReadNotification ? textColorPrimary : textColorPrimary,
                        }}
                    >
                        {fullName}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            sx={{
                                fontSize: 16, fontWeight: 500, marginTop: 0.5,
                                color: !isReadNotification ? textColorPrimary : textColorSecondary,
                            }}
                        >
                            {locales[lang]?.notificationPage.follow.requestFollow}
                        </Typography>
                        <Typography sx={{ ml: 1, fontSize: 13, color: textColorSecondary, marginTop: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {getShortTimeFormat(time, lang)}
                        </Typography>
                    </Box>
                </Box>
            </Link>

            <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, }} >
                <Button onClick={handleReject} variant="outlined" color="error" sx={{ paddingX: 2, textTransform: 'none', fontWeight: 600, }} >
                    {locales[lang]?.notificationPage.follow.reject}
                </Button>
                <Button onClick={handleAccept} variant="contained" color="primary" sx={{ paddingX: 3, textTransform: 'none', fontWeight: 600, }} >
                    {locales[lang]?.notificationPage.follow.accept}
                </Button>
            </Box>
        </Box>
    )
}