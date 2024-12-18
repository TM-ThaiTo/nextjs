'use client'
import React, { useState } from "react";
import TopGroupReceiver from "@/components/message/group/top";
import InputTextGroupField from "@/components/message/group/input";
import Box from "@mui/material/Box";
import { mainContentMessage } from "@/components/message/styles";
import DetailMessageGroup from "@/components/message/group/detail.group/detail.group.message";

type Props = {
    children: React.ReactNode;
    data: any;
}

export default function LayoutMessageBySlugRoomGroup({ children, data }: Props) {
    const [isBlock, setIsBlock] = useState<boolean>(false);
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const { auth, conversation, members, owner } = data;
    const roomId = conversation?.idConversation;
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
                <Box sx={{
                    ...mainContentMessage,
                    height: '100vh',
                    width: isOpenDetail ? 'calc(100% - 400px)' : '100%',
                    borderRight: '1px solid #e0e0e0',
                }}>
                    <TopGroupReceiver
                        data={data}
                        isOpenReport={isOpenDetail}
                        setIsOpenReport={setIsOpenDetail}
                    />
                    {children}
                    <InputTextGroupField idRoom={roomId} />
                </Box>
                {isOpenDetail && <DetailMessageGroup data={data} />}
            </Box>
        </>
    )
}