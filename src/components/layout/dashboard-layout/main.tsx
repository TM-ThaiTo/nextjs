'use client';

import SidebarWrapper from "@/components/layout/helper/sliderbar_wrapper";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MainContent, MobileNavBar } from "@/components/layout/helper/contants";
import useTheme from "@mui/material/styles/useTheme";
import { RenderActionDashboard } from "../helper/render_action.dashboard";
import { actionsDashboard } from "@/constants/home_actions";
import { usePathname } from "next/navigation";

type Props = {
    myUser: any;
    children: React.ReactNode;
    endpoint?: any[];
}

export default function MainLayoutDashBoard({ myUser, children, endpoint }: Props) {
    const theme = useTheme();
    const themeBackground = theme.palette.background.paper;
    const themeText = theme.palette.text.primary;
    const themeAction = theme.palette.action.active;
    const isDesktop = useMediaQuery("(min-width: 1030px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1030px)");
    const isMobile = useMediaQuery("(max-width: 768px)");
    const adjustedIsMobile = isMobile;
    const isDashboard = true;
    const actions = (endpoint && endpoint.length > 0) ? endpoint : actionsDashboard;
    const pathname = usePathname();
    const isPagePostDashboard = pathname.startsWith('/dashboard/post/') || pathname === '/dashboard/post';
    const adjustedIsDesktop = isPagePostDashboard ? false : isDesktop;
    const adjustedIsTablet = isPagePostDashboard && !isMobile ? true : isTablet;

    return (
        <>
            <Box sx={{ height: 'auto', display: 'flex' }}>
                <SidebarWrapper
                    isDesktop={adjustedIsDesktop}
                    isTablet={adjustedIsTablet}
                    myUser={myUser}
                    isDashboard={isDashboard}
                >
                    {RenderActionDashboard({
                        isDesktop: adjustedIsDesktop,
                        isTablet: adjustedIsTablet,
                        themeText,
                        themeAction,
                        myUser,
                        actionDashboard: actions
                    })}
                </SidebarWrapper>
                <MainContent
                    isDesktop={adjustedIsDesktop}
                    isTablet={adjustedIsTablet}
                    isMobile={adjustedIsMobile}
                    showContacts={false}
                >
                    {children}
                </MainContent>
                {adjustedIsMobile &&
                    <MobileNavBar themeBackground={themeBackground}>
                        {RenderActionDashboard({ isDesktop, isTablet, themeText, themeAction, myUser, actionDashboard: actions })}
                    </MobileNavBar>
                }
            </Box>
        </>
    )
}