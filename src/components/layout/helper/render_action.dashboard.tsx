'use client';
import { ActionLink, ActionItemChildren, ActionChildren } from "@/components/layout/helper/contants";
import { Collapse, List, Typography } from '@mui/material';
import { useState } from "react";
import Box from "@mui/material/Box";

type ActionDashboardProps = {
    isDesktop: boolean;
    isTablet: boolean;
    themeText: any;
    themeAction: any;
    myUser: any;
    actionDashboard: any[];
};

// Update the function name and define it as a React component
export const RenderActionDashboard = ({
    isDesktop,
    isTablet,
    themeText,
    themeAction,
    actionDashboard
}: ActionDashboardProps): React.ReactNode => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (label: string) => {
        setOpenItems(prevState => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };

    return (
        <>
            {actionDashboard?.map((group, index) => (
                <div key={index}>
                    <Typography
                        variant="h6"
                        sx={{ mt: 2, fontSize: '0.875rem', fontWeight: '600', color: 'bodydark2' }}
                    >
                        {group.menu}
                    </Typography>
                    {group?.menuItems.map((link: any, linkIndex: any) => (
                        <div key={linkIndex}>
                            <Box sx={{ display: 'flex' }}>
                                {link.children ? (
                                    <ActionChildren
                                        link={link}
                                        isDesktop={isDesktop}
                                        themeText={themeText}
                                        themeAction={themeAction}
                                        handleToggle={handleToggle}
                                        openItems={openItems}
                                    />
                                ) : (
                                    <ActionLink
                                        link={link}
                                        isDesktop={isDesktop}
                                        themeText={themeText}
                                    />
                                )}
                            </Box>
                            {link.children && (
                                <Collapse in={openItems[link.label]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {link.children.map((child: any, childIndex: any) => (
                                            <div key={childIndex}>
                                                <ActionItemChildren
                                                    link={child}
                                                    isDesktop={isDesktop}
                                                    themeText={themeText}
                                                />
                                            </div>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};
