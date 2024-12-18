'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fImageFile, fMediaFile, fMediaFiles } from "@/types/post";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { filterOptions } from '@/constants/filter_options';
import { getLanguage } from "@/helper/mapTypesLanguage";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { locales } from "@/language/constant";

type Props = {
    image: fImageFile;
    setMediaFileDoneEdits: (data: any) => void;
};

type FilterName = keyof typeof filterOptions;

export default function EditImagePost({ image, setMediaFileDoneEdits }: Props) {
    const lang = getLanguage();
    const { textColorPrimary, borderColor, linkColor, backgroundColor } = useThemeColors()
    const [isImage, setIsImage] = useState<fImageFile>(image);
    const [filter, setFilter] = useState<FilterName>('none'); // State to manage the selected filter
    const [brightness, setBrightness] = useState<number>(0); // Brightness adjustment (neutral is 0)
    const [contrast, setContrast] = useState<number>(0); // Contrast adjustment (neutral is 0)
    const [fade, setFade] = useState<number>(0); // Fade adjustment (neutral is 0)
    const [saturation, setSaturation] = useState<number>(0); // Saturation adjustment (neutral is 0)
    const [temperature, setTemperature] = useState<number>(0); // Temperature adjustment (neutral is 0)
    const [vignette, setVignette] = useState<number>(0); // Vignette adjustment (neutral is 0)
    const [tabValue, setTabValue] = useState<number>(0); // Manage the selected tab (Filters or Adjustments)
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Reference to canvas

    const getCssFilter = useCallback(() => {
        const baseFilter = filterOptions[filter].css;
        const adjustmentFilters = `brightness(${1 + brightness / 100}) contrast(${1 + contrast / 100})opacity(${1 - fade / 100}) saturate(${1 + saturation / 100})sepia(${temperature / 100})${vignette ? `drop-shadow(0px 0px ${vignette}px black)` : ''}`;
        return `${baseFilter} ${adjustmentFilters}`;
    }, [brightness, contrast, fade, filter, saturation, temperature, vignette]);

    const handleSaveImage = useCallback(() => {
        const canvas = canvasRef.current;
        const img = new window.Image();
        img.src = image?.base64;

        img.onload = () => {
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    canvas.width = img.width;
                    canvas.height = img.height;

                    ctx.filter = getCssFilter();

                    // Draw the full image with filters applied
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    // Get the base64 URL of the processed image
                    const base64URL = canvas.toDataURL("image/png");

                    // Prepare the data to be saved
                    const data: fMediaFile = {
                        file: {
                            url: image?.url,
                            base64: base64URL
                        },
                        type: 'image'
                    };

                    setIsImage({ ...isImage, base64: base64URL });

                    setMediaFileDoneEdits((prev: fMediaFiles): fMediaFiles => {
                        const existingMediaIndex = prev.findIndex((item: fMediaFile) => item?.file?.url === isImage?.url);

                        if (existingMediaIndex !== -1) {
                            const updatedMediaFiles = [...prev]; // Create a shallow copy of the array
                            updatedMediaFiles[existingMediaIndex] = data; // Replace the existing media file at the found index
                            return updatedMediaFiles; // Return the updated array
                        }

                        // If media doesn't exist, add the new data to the array
                        return [...prev, data]; // Append the new data and return the new array
                    });
                }
            }
        };
    }, [image, isImage, setMediaFileDoneEdits, getCssFilter, canvasRef]);
    useEffect(() => {
        handleSaveImage();
    }, [filter, brightness, contrast, fade, saturation, temperature, vignette, handleSaveImage]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const adjustmentsConfig = {
        Brightness: { min: -100, max: 100, step: 1, value: brightness, setValue: setBrightness, default: 0 },
        Contrast: { min: -100, max: 100, step: 1, value: contrast, setValue: setContrast, default: 0 },
        Fade: { min: 0, max: 100, step: 1, value: fade, setValue: setFade, default: 0 },
        Saturation: { min: -100, max: 100, step: 1, value: saturation, setValue: setSaturation, default: 0 },
        Temperature: { min: -100, max: 100, step: 1, value: temperature, setValue: setTemperature, default: 0 },
        Vignette: { min: 0, max: 100, step: 1, value: vignette, setValue: setVignette, default: 0 }
    };

    const renderFilters = () => (
        <Box sx={{ width: 325, padding: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {Object.keys(filterOptions).map((filterName) => (
                    <Box key={filterName} onClick={() => setFilter(filterName as FilterName)} sx={{ cursor: 'pointer' }}>
                        <Image
                            src={filterOptions[filterName as FilterName].thumbnail}
                            alt={filterName}
                            width={80} height={80}
                            style={{
                                border: filter === filterName ? '1px solid white' : 'none',
                            }}
                        />
                        <Typography sx={{ textAlign: 'center', color: 'white' }}>{filterName.charAt(0).toUpperCase() + filterName.slice(1)}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );

    const renderAdjustments = () => (
        <Box sx={{ padding: 2 }}>
            {Object.entries(adjustmentsConfig).map(([key, config]) => (
                <Box key={key} sx={{ gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ color: 'white' }}>{key}</Typography>
                        <Typography
                            sx={{
                                fontWeight: '800', cursor: 'pointer',
                                color: textColorPrimary,
                                '&:hover': { color: borderColor }
                            }}
                            onClick={() => config.setValue(config.default)}
                        >
                            {locales[lang]?.reset}
                        </Typography>
                    </Box>
                    <Slider
                        min={config.min} max={config.max} step={config.step} value={config.value}
                        onChange={(e, newValue) => config.setValue(newValue as number)} valueLabelDisplay="auto"
                        sx={{ color: 'white', maxWidth: 290 }}
                    />
                </Box>
            ))}
        </Box>
    );

    return (
        <Box sx={{ width: 1150, height: 810, display: 'flex', backgroundColor: 'none' }}>
            <Box sx={{ width: 810, height: 808, backgroundColor: 'none', }}>
                <Box component="img"
                    src={isImage?.base64}
                    alt="Edited Image" sx={{
                        width: '100%', height: '100%', objectFit: 'contain',
                        filter: getCssFilter(),
                        borderBottomLeftRadius: '15px',
                    }} />
            </Box>

            <Box sx={{
                width: 340, backgroundColor: 'gray', height: '100%', overflowY: 'auto',
                display: 'flex', flexDirection: 'column',
                borderBottomRightRadius: '15px',
            }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label={locales[lang]?.filters} sx={{ width: '50%' }} />
                    <Tab label={locales[lang]?.adjustments} sx={{ width: '50%' }} />
                </Tabs>

                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {tabValue === 0 ? renderFilters()
                        : tabValue === 1 ? renderAdjustments()
                            : null
                    }
                </Box>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Box>
        </Box>
    );
}