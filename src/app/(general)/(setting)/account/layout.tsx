'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaFacebookMessenger, FaCommentDots, FaAd } from 'react-icons/fa';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SecurityIcon from '@mui/icons-material/Security';
import StarsIcon from '@mui/icons-material/Stars';
import BlockIcon from '@mui/icons-material/Block';
import HideSourceIcon from '@mui/icons-material/HideSource';
import ListItem from '@mui/material/ListItem';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { FaRegUser } from "react-icons/fa";
import { FaHireAHelper } from "react-icons/fa";
import Link from 'next/link';
import { locales } from '@/language/constant';
import { mapLanguage } from '@/helper/mapTypesLanguage';
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { usePathname } from 'next/navigation';

type ActionChild = {
    icon: React.ReactNode;
    label: string;
    href: string;
};

type Action = {
    label: string;
    children: ActionChild[];
};

type Props = {
    children: React.ReactNode;
};

const actionsSetting = (lang: keyof typeof locales): Action[] => [
    {
        label: locales[lang]?.howToUse,
        children: [
            { icon: <FaUser />, label: locales[lang]?.editProfile, href: '/account/edit' },
            { icon: <NotificationsNoneIcon />, label: locales[lang]?.editNotifications, href: '/account/notifications' },
        ],
    },
    {
        label: locales[lang]?.whoCanSeeYourContent,
        children: [
            { icon: <SecurityIcon />, label: locales[lang]?.accountPrivacy, href: '/account/privacy' },
            { icon: <StarsIcon />, label: locales[lang]?.closeFriends, href: '/account/close-friends' },
            { icon: <BlockIcon />, label: locales[lang]?.blocked, href: '/account/blocked_accounts' },
            { icon: <HideSourceIcon />, label: locales[lang]?.hideStoryandLive, href: '/account/hide-story-and-live' },
        ],
    },
    {
        label: locales[lang]?.howOthersCanInteractWithYou,
        children: [
            { icon: <FaFacebookMessenger />, label: locales[lang]?.editMessages, href: '/account/messages' },
            { icon: <FaCommentDots />, label: locales[lang]?.editComments, href: '/account/comments' },
            { icon: <FaAd />, label: locales[lang]?.hiddenWords, href: '/account/hidden-words' },
        ],
    },
    {
        label: locales[lang]?.yourAppAndMedia,
        children: [
            { icon: <GTranslateIcon />, label: locales[lang]?.language, href: '/account/preferences' }
        ]
    },
    {
        label: locales[lang]?.forFamilies,
        children: [
            { icon: <Diversity1Icon />, label: locales[lang]?.family, href: '/account/help' }
        ]
    },
    {
        label: 'More info and support',
        children: [
            { icon: <FaHireAHelper />, label: locales[lang]?.help, href: '/account/help' },
            { icon: <FaRegUser />, label: locales[lang]?.accountStatus, href: '/account/help' }
        ]
    }
];

const styleIcon = (icon: React.ReactNode, color: string = '#000', size: number = 20) => (
    <div
        style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', color,
            fontSize: `${size}px`,
            width: size,
            height: size,
        }}
    >
        {icon}
    </div>
);

export default function LayoutSettingAccount({ children }: Props) {
    const { textColorPrimary, borderColor, actionHoverColor, actionActiveColor } = useThemeColors();
    const [lang, setLang] = useState<keyof typeof locales>('en');
    const pathName = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLang = localStorage.getItem('lang') || 'en';
            setLang(mapLanguage(storedLang) as keyof typeof locales);
        }
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <div style={{ width: 315, height: '100vh', overflowY: 'auto', overflowX: 'hidden', borderRight: `1px solid ${borderColor}`, }} >
                <aside style={{ width: 300, padding: '20px', borderRight: `1px solid ${borderColor}`, }} >
                    <h1 style={{ fontSize: '20px', fontWeight: 800, color: textColorPrimary, padding: '0 16px', }}>{locales[mapLanguage(lang)]?.setting}</h1>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {actionsSetting(lang)?.map((action, index) => (
                            <li key={index}>
                                <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'gray', padding: '0 16px', }}>{action.label}</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {action.children.map((child, childIndex) => {
                                        const isActive = pathName === child.href;
                                        return (
                                            <ListItem
                                                key={childIndex}
                                                sx={{
                                                    height: 50, display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '10px',
                                                    color: textColorPrimary,
                                                    backgroundColor: isActive ? actionActiveColor : 'transparent',
                                                    '&:hover': { backgroundColor: actionHoverColor },
                                                }}
                                            >
                                                <Link href={child.href} style={{ width: '100%', textDecoration: 'none', display: 'flex', alignItems: 'center', color: textColorPrimary, }} >
                                                    <div style={{ marginRight: '10px' }}>{styleIcon(child.icon, textColorPrimary, 24)}</div>
                                                    <div style={{ fontWeight: 600 }}>{child.label}</div>
                                                </Link>
                                            </ListItem>
                                        )
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
            <div style={{
                width: 'calc(100% - 315px)', height: '100vh', overflowY: 'auto',
                borderRight: `1px solid ${borderColor}`
            }}
            >
                {children}
            </div>
        </div>
    );
}
