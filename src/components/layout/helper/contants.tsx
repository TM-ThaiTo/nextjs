import React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { actionBoxStyle, mainContentStyle, mobileNavBarBoxStyle, mobileNavBarInnerStyle, mobileNavBarStyle } from "@/components/layout/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Image from "next/image";

const ActionLink = ({
    link,
    isDesktop,
    themeText,
    isActive,
    actionActiveColor,
    actionHoverColor,
}: {
    link: any,
    isDesktop: boolean,
    themeText: string,
    isActive?: boolean,
    actionActiveColor?: any,
    actionHoverColor?: any,
}) => {
    return (
        <>
            {link && link.href ? (
                <div style={{ width: '100%', height: 60 }}>
                    <Link href={link?.href} passHref style={{ textDecoration: 'none', color: themeText }} prefetch={false}>
                        <Box sx={{ ...actionBoxStyle(isDesktop, actionHoverColor), backgroundColor: isActive ? actionActiveColor : 'transparent', borderRadius: '10px' }}>
                            {link?.link
                                ? <Image src={link?.link || '/static/avt_default'}
                                    width={30}
                                    height={30}
                                    objectFit="contain"
                                    alt="avatar"
                                    style={{ height: 25, width: 25, borderRadius: '50%' }}
                                />
                                : <>{link?.icon}</>
                            }
                            {isDesktop && <Typography component="span" sx={{ marginLeft: '0.5rem' }}><span>{link?.label}</span></Typography>}
                        </Box>
                    </Link>
                </div>
            ) : (
                <div style={{ width: '100%', height: 60 }}>
                    <Box sx={{ ...actionBoxStyle(isDesktop, actionHoverColor), '&:hover': 'none' }} >
                        {link?.icon}
                        {isDesktop && <Typography component="span" sx={{ marginLeft: '0.5rem' }}><span>{link?.label}</span></Typography>}
                    </Box>
                </div>
            )}
        </>
    )
};

const ActionChildren = ({
    link,
    isDesktop,
    themeText,
    handleToggle,
    openItems
}: {
    link: any,
    isDesktop: boolean,
    themeText: string,
    themeAction: string,
    handleToggle: (label: string) => void,
    openItems: any,
}) => {
    return (
        <div style={{ width: '100%', height: 50, display: 'flex' }}>
            <Box onClick={() => handleToggle(link.label)} sx={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <Box sx={{ ...actionBoxStyle(isDesktop), justifyContent: 'space-between' }} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {link?.icon}
                        {isDesktop && <Typography component="span" sx={{ marginLeft: '0.5rem' }}><span>{link?.label}</span></Typography>}
                    </div>
                    {openItems[link.label] ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
                </Box>
            </Box>
        </div>
    )
}

const ActionItemChildren = ({ link, isDesktop, themeText }: { link: any, isDesktop: boolean, themeText: string }) => {
    return (
        <>
            {link && link.href && (
                <div style={{ width: '100%', height: 50 }}>
                    <Link href={link?.href} passHref style={{ textDecoration: 'none', color: themeText }} prefetch={false}>
                        <Box sx={actionBoxStyle(isDesktop)}>
                            <Typography sx={{ fontSize: '8px', marginRight: '10px' }}>{link?.icon}</Typography>
                            {isDesktop && <Typography component="span" sx={{ marginLeft: '0.5rem' }}><span>{link?.label}</span></Typography>}
                        </Box>
                    </Link>
                </div>
            )}
        </>
    )
}

const ActionButton = ({
    icon,
    label,
    onClick,
    isDesktop,
    isActive,
    actionActiveColor,
    actionHoverColor
}: {
    icon: React.ReactNode,
    label: string,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    isDesktop: boolean,
    isActive?: boolean,
    actionActiveColor?: any,
    actionHoverColor?: any,
}) => (
    <div style={{ width: '100%', height: 60 }}>
        <Box sx={{
            ...actionBoxStyle(isDesktop, actionHoverColor),
            cursor: 'pointer',
            backgroundColor: isActive ? actionActiveColor : 'transparent',
            borderRadius: '10px'
        }} onClick={onClick}>
            {icon}
            {isDesktop && <Typography component="span" sx={{ marginLeft: '0.5rem' }}><span>{label}</span></Typography>}
        </Box>
    </div>
);

const MobileNavBar = ({ children, themeBackground }: { children: React.ReactNode, themeBackground: string }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const childrenArray = React.Children.toArray(children);
    const childCount = childrenArray.length;
    const buttonWidth = containerWidth / childCount;
    return (
        <div style={mobileNavBarStyle(themeBackground) as React.CSSProperties}>
            <div style={mobileNavBarInnerStyle}>
                <Box sx={mobileNavBarBoxStyle} ref={containerRef}>
                    {React.Children.map(childrenArray, (child, index) => (
                        <div style={{
                            width: `${buttonWidth}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            order: index === Math.floor(childCount / 2) ? 0 : index < Math.floor(childCount / 2) ? -1 : 1
                        }}>
                            {child}
                        </div>
                    ))}
                </Box>
            </div>
        </div>
    );
};

const MainContent = ({ isDesktop, isTablet, isMobile, showContacts, children }: { isDesktop: boolean, isTablet: boolean, isMobile: boolean, showContacts: boolean, children: React.ReactNode }) => (
    <main style={mainContentStyle(isDesktop, isTablet, isMobile, showContacts) as React.CSSProperties}>
        {children}
    </main>
);

export {
    ActionLink,
    ActionChildren,
    ActionItemChildren,
    ActionButton,
    MobileNavBar,
    MainContent,
};