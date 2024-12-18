'use client';

import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react"

type Props = {
    children: React.ReactNode;
}

export default function LayoutPageHome({ children }: Props) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1650px)");

    return (
        <div style={{
            height: 'auto',
            display: 'flex', alignItems: 'center', flexDirection: 'column',
            width: isMobile ? '100%' : '70%',
            maxWidth: isMobile ? 'none' : '100%',
            marginLeft: isMobile ? undefined : isTablet ? 100 : 200,
        }}>
            {children}
        </div>
    )
}