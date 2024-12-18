
'use client';

import Typography from '@mui/material/Typography';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import RenderSuggested from '@/components/layout/auth-layout/navbar/Suggest/RenderSuggest';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

type Props = {
    type?: number; // 1: all notification // 2: follow
    suggested: any;
    myUser: any;
}
export default function RenderSuggestedRecommend({ suggested, myUser, type }: Props) {
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { textColorPrimary, textColorSecondary } = useThemeColors();

    const renderUiAllNotification = () => <div style={{ width: '100%', height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid ${textColorPrimary}`, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <NotificationsNoneIcon sx={{ fontSize: 70, border: '1px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 120, }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorPrimary }}>
                {locales[lang]?.notificationPage?.post?.noNotification1}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorSecondary, maxWidth: 400, mt: 1, textAlign: 'center', }}>
                {locales[lang]?.notificationPage?.post?.noNotification2}
            </Typography>
        </div>
    </div>

    const renderUiFollowNotification = () => <div style={{ width: '100%', height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid ${textColorPrimary}`, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <AccessibilityIcon sx={{ fontSize: 70, border: '1px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 120, }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorPrimary }}>
                {locales[lang]?.notificationPage?.follow?.nofollowRequest}

            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: textColorSecondary, maxWidth: 400, mt: 1, textAlign: 'center', }}>
                {locales[lang]?.notificationPage?.follow?.startTracking}

            </Typography>
        </div>
    </div>

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {type === 1 && <>{renderUiAllNotification()}</>}
            {type === 2 && <>{renderUiFollowNotification()}</>}

            <div style={{ padding: '10px' }}>
                <RenderSuggested myUser={myUser} suggestedUser={suggested} isNotifacationPage={true} />
            </div>
        </div>
    )
}