'use client'

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Rooms } from "@/types/message";
import TopNavBarMessage from "./top.navbar";
import RenderRoomMessages from "@/components/message/render/room.message";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getConversation, revalidateTagGetConversation } from "@/actions/chat/p2p/conversation/actions";

type LayoutMessageProp = {
    rooms: Rooms | [];
    myUser: any;
    children: React.ReactNode;
}

export default function LayoutMessage({ rooms, myUser, children }: LayoutMessageProp) {
    const pathname = usePathname();
    const [roomData, setRoomData] = useState<Rooms | []>(rooms);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isRequestsPage = pathname === '/message/requests';
    const isGroupPage = pathname === '/message/groups' || pathname.startsWith('/message/groups/')
    if (isRequestsPage || isGroupPage) return <>{children}</>

    const handleResetRoom = async () => revalidateTagGetConversation();
    return (
        <Box sx={{ width: '100%', display: 'flex', height: '100vh' }}>
            <Box sx={{ maxWidth: 400, height: '100vh', width: '100%', borderRight: '1px solid #e0e0e0', overflow: 'auto' }}>
                <TopNavBarMessage myUser={myUser} handleResetRoom={handleResetRoom} />
                <RenderRoomMessages chatrooms={roomData} myUser={myUser} />
            </Box>
            <Box sx={{ height: !isMobile ? '100vh' : 'calc(100vh - 80px)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
        </Box>
    )
}