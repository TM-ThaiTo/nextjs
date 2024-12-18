'use client'

import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

// Tạo một component CircularProgress tuỳ chỉnh với màu gradient
const GradientCircularProgress = styled(CircularProgress)<CircularProgressProps>(() => ({
    circle: {
        stroke: 'url(#gradientColors)',
    },
}));

const CustomCircularProgress = () => (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
        <svg width="0" height="0">
            <defs>
                <linearGradient id="gradientColors" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="20%" style={{ stopColor: '#FF0000', stopOpacity: 1 }} />
                    <stop offset="14%" style={{ stopColor: '#FF7F00', stopOpacity: 1 }} />
                    <stop offset="28%" style={{ stopColor: '#FFFF00', stopOpacity: 1 }} />
                    <stop offset="60%" style={{ stopColor: '#00FF00', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
        <GradientCircularProgress style={{ width: 100, height: 100 }} />
    </div>
);

export default CustomCircularProgress;
