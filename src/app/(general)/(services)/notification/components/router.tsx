'use client';

import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

export default function RouterFormNotification() {
    const path = usePathname();
    const { useThemeColors, lang, locales } = importThemeAndLanguge();
    const { textColorPrimary, actionHoverColor, actionActiveColor, borderColor } = useThemeColors();
    const style_link = { height: "100%", width: "24%", textDecoration: "none", }

    const style_item = (isActive: boolean) => ({
        height: "100%",
        width: "100%",
        fontSize: 14,
        textDecoration: "none",
        color: textColorPrimary,
        fontWeight: isActive ? "700" : "normal",
        borderRadius: '10px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        '&:hover': {
            backgroundColor: actionHoverColor,
            transform: "scale(1.05)",
        },
        ':active': {
            backgroundColor: actionActiveColor,
        }
    });

    return (
        <Box sx={{ height: "100%", width: '100%', display: "flex", justifyContent: 'space-between', alignItems: "center", p: '5px', borderBottom: `1px solid ${borderColor} ` }}>
            <Link style={style_link} href="/notification">
                <Box sx={style_item(path === "/notification")}>
                    {locales[lang]?.notificationPage.All}
                </Box>
            </Link>
            <Link style={style_link} href="/notification/post">
                <Box sx={style_item(path === "/notification/post")}>
                    {locales[lang]?.notificationPage.Post}
                </Box>
            </Link>
            <Link style={style_link} href="/notification/follow">
                <Box sx={style_item(path === "/notification/follow")}>
                    {locales[lang]?.notificationPage.Follow}
                </Box>
            </Link>
            <Link style={{ ...style_link, textAlign: 'center' }} href="/notification/request-message">
                <Box sx={style_item(path === "/notification/request-message")}>
                    {locales[lang]?.notificationPage.RequestMessage}
                </Box>
            </Link>
        </Box>
    );
}
