'use client'

import Box from "@mui/material/Box";
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { FaThLarge } from "react-icons/fa";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { Typography } from "@mui/material";
import { iconReel } from "@/helper/svg_icon";
import { locales } from '@/language/constant'
import { getLanguage } from "@/helper/mapTypesLanguage";
type RouteUserInfoProp = {
    slug: string;
}

export default function RouteUserInfo({ slug }: RouteUserInfoProp) {
    const pathname = usePathname();
    const { textColorPrimary, textColorSecondary, actionActiveColor, borderColor } = useThemeColors();
    const lang = getLanguage();

    const isActive = (path: string) => { return pathname === path; };
    const linkStyle = (path: string) => ({
        width: '100%',
        maxWidth: 150,
        textDecoration: 'none',
        color: isActive(path) ? textColorPrimary : textColorSecondary,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        fontWeight: '700',
    });

    return (
        <section>
            <Box sx={{
                width: '100%', height: 50, marginTop: '10px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                marginBottom: '10px',
            }}>
                <Box sx={{
                    width: '100%',
                    maxWidth: 936,
                    height: '100%',
                }}>
                    <Box sx={{
                        borderTop: `1px solid ${borderColor}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', width: '100%'
                    }}>
                        <Box sx={{
                            width: 'auto',
                            maxWidth: 150,
                            height: '100%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderTop: isActive(`/${slug}`) ? `2px solid ${textColorPrimary}` : 'none',
                            mr: '40px',
                        }}>
                            <Link href={`/${slug}`} style={linkStyle(`/${slug}`)} >
                                <FaThLarge style={{ fontSize: '13px' }} />
                                <Typography sx={{ ml: 1, fontSize: '13px' }}>{locales[lang]?.profile?.posts}</Typography>
                            </Link>
                        </Box>

                        <Box sx={{
                            width: 'auto',
                            maxWidth: 150,
                            height: '100%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderTop: isActive(`/${slug}/reels`) ? `2px solid ${textColorPrimary}` : 'none'
                        }}>
                            <Link href={`/${slug}/reels`} style={linkStyle(`/${slug}/reels`)} >
                                {iconReel(15, textColorPrimary)}
                                <Typography sx={{ ml: 1, fontSize: '13px' }}>{locales[lang]?.profile?.reels}</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    )
}
