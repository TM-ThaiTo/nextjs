'use client'

import { IOnePost } from "@/types/post";
import Link from "next/link";
import Image from 'next/image'
import { getShortTimeFormat } from "@/helper/formatTime";
import React from "react";
import Box from "@mui/material/Box";
import { locales } from "@/language/constant";
import useThemeColors from "@/utils/hooks/theme/hookTheme";

type Props = {
    data: IOnePost,
    lang: keyof typeof locales,
}

const RenderContent = React.memo(({ data, lang }: Props) => {
    const { textColorPrimary, textColorSecondary, borderColor } = useThemeColors();
    const { post, user } = data;
    return (
        <>
            {post?.content && (
                <Box sx={{ display: 'flex', marginBottom: '5px' }}>
                    <Box sx={{ width: 40, height: 40 }}>
                        <Link href={`/${user?.slug}`} style={{ textDecoration: 'none' }}>
                            <Image
                                src={user?.avatar || '/static/avt_default.png'}
                                alt={'User'} width={32} height={32} priority
                                style={{ borderRadius: '50%', border: `0.5px solid ${borderColor}`, objectFit: 'cover' }}
                            />
                        </Link>
                    </Box>
                    <Box sx={{ marginLeft: '10px', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <Link href={`/${user?.slug}`} style={{ textDecoration: 'none', color: textColorPrimary, fontSize: 15, fontWeight: 700 }}>
                                {user?.slug}
                            </Link>
                            <Box sx={{ fontSize: 13, fontWeight: 500, color: textColorSecondary, marginLeft: '10px' }}>
                                {getShortTimeFormat(post?.createdAt, lang)}
                            </Box>
                        </Box>

                        <Box sx={{ marginBottom: '5px' }}>
                            <span style={{ fontWeight: 500, fontSize: 15, lineHeight: 1.5, color: textColorPrimary }}>{post?.content}</span>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
})

RenderContent.displayName = 'RenderContent';
export default RenderContent;