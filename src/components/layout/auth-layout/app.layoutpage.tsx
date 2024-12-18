'use client';

import React, { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { ModalCreatePost } from '@/components/modal/create-post/modal.createPost';
import { usePathname } from 'next/navigation';
import { useVoiceCall } from '@/utils/hooks/callVoices/useCallVoice';
import CallNotification from '@/components/calls/CallNotification'
import SidebarWrapper from "../helper/sliderbar_wrapper";
import { MobileNavBar, MainContent } from "../helper/contants";
import { RenderActionHome } from "../helper/render-action";
import useThemeColors from "@/utils/hooks/theme/hookTheme";

type Props = {
    children: React.ReactNode,
    myUser: any,
    conversations?: any,
    dataGroup?: any,
    suggestedUser?: any,
}
export const Layout = ({ children, myUser }: Props) => {
    const { backgroundColor, textColorPrimary } = useThemeColors();

    const isContacts = useMediaQuery("(min-width: 1200px)");
    const isDesktop = useMediaQuery("(min-width: 1030px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1030px)");
    const isMobile = useMediaQuery("(max-width: 768px)");

    const [openModalCreatePost, setOpenModalCreatePost] = useState<boolean>(false);
    const handleOpenModalCreatePost = () => setOpenModalCreatePost(true);
    const handleCloseModalCreatePost = () => setOpenModalCreatePost(false);

    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isMessagePage = pathname.startsWith('/message/') || pathname === '/message';
    const isDashboardPage = pathname.startsWith('/dashboard') || pathname === '/dashboard';
    const isCallPage = pathname.startsWith('/call/') || pathname === '/call';
    const isGamePage = pathname.startsWith('/game/') || pathname === '/game';
    const showContacts = isContacts && isHomePage;

    const adjustedIsDesktop = isMessagePage || isGamePage ? false : isDesktop;
    const adjustedIsTablet = isMessagePage || isGamePage && !isMobile ? true : isTablet;
    const adjustedIsMobile = isMessagePage || isGamePage && isMobile ? true : isMobile;

    const { incomingCallData } = useVoiceCall();
    const [isOpenNotificationCall, setIsOpenNotificationCall] = useState<boolean>(false);
    const hasSetNotification = useRef<boolean>(false);
    useEffect(() => {
        const handleStorageChange = () => {
            const storedCall = localStorage.getItem('incomingCall');
            if (storedCall && incomingCallData && !hasSetNotification.current) {
                setIsOpenNotificationCall(true); hasSetNotification.current = true;
            } else if (!storedCall) { setIsOpenNotificationCall(false); hasSetNotification.current = false; }
        };
        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);
        return () => { window.removeEventListener('storage', handleStorageChange); };
    }, [incomingCallData]);
    if (isCallPage || isDashboardPage) return <>{children}</>

    return (
        <>
            <Box sx={{ height: 'auto', display: 'flex' }}>
                <SidebarWrapper isDesktop={adjustedIsDesktop} isTablet={adjustedIsTablet} myUser={myUser}>
                    {RenderActionHome({
                        isDesktop: adjustedIsDesktop,
                        isTablet: adjustedIsTablet,
                        themeText: textColorPrimary,
                        handleOpenModalCreatePost, myUser,
                        isPathName: pathname,
                    })}
                </SidebarWrapper>
                <MainContent isDesktop={adjustedIsDesktop} isTablet={adjustedIsTablet} isMobile={adjustedIsMobile} showContacts={showContacts}>
                    {children}
                </MainContent>

                {adjustedIsMobile && !adjustedIsDesktop && !adjustedIsTablet && <MobileNavBar themeBackground={backgroundColor}>
                    {RenderActionHome({
                        isDesktop: false,
                        isTablet: false,
                        themeText: textColorPrimary,
                        handleOpenModalCreatePost,
                        myUser
                    })}
                </MobileNavBar>}
            </Box>

            <ModalCreatePost open={openModalCreatePost} handleClose={handleCloseModalCreatePost} myUser={myUser} />
            <CallNotification open={isOpenNotificationCall} setIsOpenNotificationCall={setIsOpenNotificationCall} hasSetNotification={hasSetNotification} data={incomingCallData} />
        </>
    );
}
