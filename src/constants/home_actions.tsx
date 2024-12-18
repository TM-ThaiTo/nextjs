import React from 'react';
import { Home, Search, Explore, Message, Notifications, SportsEsports } from '@mui/icons-material';
import { FaRegCircle, FaPager, FaRegDotCircle, FaRegClipboard, FaCommentDots, FaRegUser } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReportIcon from '@mui/icons-material/Report';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { locales } from '@/language/constant';
import { iconReel } from '@/helper/svg_icon';

export const actionsHome = (lang: keyof typeof locales, textColorPrimary: any) => [
    { href: '/', icon: <Home />, label: locales[lang]?.actionHome.home || 'Home' },
    { href: '/search', icon: <Search />, label: locales[lang]?.actionHome.search || 'Search' },
    { href: '/explore', icon: <Explore />, label: locales[lang]?.actionHome.explore || 'Explore' },
    { href: '/reels', icon: <>{iconReel(24, textColorPrimary)}</>, label: locales[lang]?.actionHome.reels || 'Reels' },
    { href: '/message', icon: <Message />, label: locales[lang]?.actionHome.messages || 'Messages' },
    { href: '/notification', icon: <Notifications />, label: locales[lang]?.actionHome.notifications || 'Notifications' },
    { href: '/game', icon: <SportsEsports />, label: locales[lang]?.actionHome.playGames || 'Play Games' },
];

export const actionsDashboard = [
    { // group home dashboard
        menu: 'HOME',
        menuItems: [
            { href: '/dashboard', icon: <Home />, label: 'Overview' },
            { href: '/dashboard/analytics', icon: <AnalyticsIcon />, label: 'Analytics' },
            {
                icon: <FaPager />, label: 'Pages',
                children: [
                    { href: '/', icon: <FaRegCircle />, label: 'Homepage' },
                    // { href: '/dashboard/page/create', icon: <EditIcon />, label: 'Create Page' },
                ]
            },
        ]
    },
    { // group auth dashboard
        menu: 'AUTHENTICATION',
        menuItems: [
            { href: '/dashboard/role', icon: <FaRegClipboard />, label: 'Roles' },
            { href: '/dashboard/permission', icon: <AiFillApi />, label: 'Permissions' },
        ]
    },
    { // group apps dashboard
        menu: 'APPS',
        menuItems: [
            { href: '/dashboard/account', icon: <PersonIcon />, label: 'Accounts' },
            { href: '/dashboard/customer', icon: <FaRegUser />, label: 'Customers' },
            { href: '/dashboard/post', icon: <ArticleIcon />, label: 'Posts' },
            { href: '/dashboard/reel', icon: <FaRegDotCircle />, label: 'Reels' },
            { href: '/dashboard/comment', icon: <FaCommentDots />, label: 'Comments' },
            { href: '/dashboard/conversation', icon: <ChatIcon />, label: 'Conversations' },
            { href: '/dashboard/feedback', icon: <FeedbackIcon />, label: 'Feedbacks' },
            { href: '/dashboard/report', icon: <ReportIcon />, label: 'Reports' },
        ]
    }
];