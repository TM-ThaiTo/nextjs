'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from '@/utils/hooks/router/useRouter';
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';
import RenderItemNotificationCreatePost from './render-item/renderItemCreatePost';
import RenderItemNotificationLikePost from './render-item/renderItemLikePost';
import RenderSuggested from '@/components/layout/auth-layout/navbar/Suggest/RenderSuggest';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import RenderItemRequsetFollow from './render-item/renderRequestFollow';
import RenderSuggestedRecommend from './render-suggested/RenderSuggestedRecomment';

type Props = {
    data: any;
    suggested?: any;
    myUser: any;
}

/*
    1: CreatePost, 
    2: Like Post,
    3: comment post, 
    4: Reply comment,
    5: request follow, 
*/
export default function NotificationForm({ data, suggested, myUser }: Props) {

    const [dataNotification, setDataNotification] = useState<any>(data);
    const { lang, useThemeColors, locales } = importThemeAndLanguge();
    const { textColorPrimary, borderColor, actionHoverColor, textColorSecondary } = useThemeColors();
    const router = useRouter();
    const renderItemType3 = (data: any) => { // comment post, 
        const { type, user, dataContent } = data;

        return (
            <Box sx={{ height: 50, width: '100%' }}>


            </Box>
        )
    }

    return (
        <div style={{ marginTop: '10px' }}>
            {dataNotification.length > 0 ?
                <>
                    {dataNotification.map((item: any, index: any) => {
                        const { type } = item?.notification;
                        return (
                            <div key={index}>
                                {type === 1 && <RenderItemNotificationCreatePost data={item} notification={item?.notification} />}
                                {type === 2 && <><RenderItemNotificationLikePost data={item} notification={item?.notification} /></>}
                                {type === 3 && <>{renderItemType3(item)}</>}
                                {type === 5 && <RenderItemRequsetFollow data={item} notification={item?.notification} />}
                            </div>
                        )
                    })}
                </>
                : <RenderSuggestedRecommend type={1} suggested={suggested} myUser={myUser} />
            }
        </div>
    )
}