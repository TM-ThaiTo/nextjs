'use client'

import React, { useRef, memo, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import { settings } from '@/helper/settingSlider';

type RenderImageProps = {
    listUrl: any[];
    h?: string | number;
    w?: string | number;
    o?: string;
}

const RenderImagePostHome = memo(({ listUrl, h, w, o }: RenderImageProps) => {
    const sliderRef = useRef<Slider>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const handleBeforeChange = (oldIndex: number, newIndex: number) => {
        if (newIndex > oldIndex) setCurrentIndex(newIndex);
        else return false;
    };
    return (
        <>
            {h && w && o && (
                <Box sx={{ height: h, width: w, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {listUrl?.length === 1 ? (
                        <Box
                            component="img"
                            src={listUrl[0]?.url}
                            alt="My Image"
                            sx={{
                                width: w,
                                height: h,
                                objectFit: o as any
                            }}
                        />
                    ) : (
                        <Box sx={{ height: '100%', width: '100%' }}>
                            <Slider
                                ref={sliderRef}
                                {...{ ...settings(sliderRef, currentIndex, listUrl.length), speed: 100 }}
                                beforeChange={handleBeforeChange}
                                afterChange={setCurrentIndex}
                            >
                                {listUrl.map((image, index) => (
                                    <Box key={index} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                                        <Box
                                            component="img"
                                            src={image.url}
                                            alt={`Image ${index}`}
                                            sx={{
                                                height: h,
                                                width: w,
                                                objectFit: o as any
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                    )}
                </Box>
            )}
        </>
    );
});
RenderImagePostHome.displayName = 'RenderImagePostHome';
export default RenderImagePostHome;
