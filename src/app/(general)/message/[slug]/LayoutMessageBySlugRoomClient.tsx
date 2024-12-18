'use client'

import React, { useState } from "react";
import Box from "@mui/material/Box";
import DetailMessage from "@/components/message/main/detail.message";
import TopReceiver from "@/components/message/top.receiver";
import InputTextField from "@/components/message/input/input";
import InputBlock from '@/components/message/input/block';
import { mainContentMessage } from "@/components/message/styles/message";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
type Props = {
    data: any;
    initialBlocked: boolean;
    children: React.ReactNode;
};

export default function LayoutMessageBySlugRoomClient({ data, initialBlocked, children }: Props) {
    const { borderColor } = useThemeColors();
    const { user, receiver, conversation } = data;
    const [isOpenReport, setIsOpenReport] = useState<boolean>(false);
    const [isBlock, setIsBlock] = useState<boolean>(initialBlocked);
    const id = conversation?._id;
    const slug = conversation?.slug;
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh', borderRight: `1px solid ${borderColor}` }}>
            <Box sx={{ ...mainContentMessage, height: '100vh', width: isOpenReport ? 'calc(100% - 400px)' : '100%' }}>
                <TopReceiver useThemeColors={useThemeColors} recipient={receiver} myUser={user} room={conversation} isOpenReport={isOpenReport} setIsOpenReport={setIsOpenReport} />
                {children}
                {isBlock
                    ? <InputBlock isBlock={isBlock} setIsBlock={setIsBlock} receiver={receiver} />
                    : <Box sx={{ p: 2, height: 80 }}><InputTextField idRoom={id} idReceiver={receiver?._id} /></Box>}
            </Box>
            {isOpenReport && <DetailMessage useThemeColors={useThemeColors} roomId={id} slug={slug} recipient={receiver} isBlock={isBlock} setIsBlock={setIsBlock} />}
        </Box>
    );
}