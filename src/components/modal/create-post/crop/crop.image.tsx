import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from '@/utils/hooks/cropImage/useDebounceEffect';
import { canvasPreview } from "@/helper/canva";
import { centerCrop, makeAspectCrop } from "@/utils/cropImage/crop_image_utils";
import { MediaFile, fMediaFile, fMediaFiles } from "@/types/post";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { FaCompress, FaSearchPlus } from "react-icons/fa";
import {
    flexCenterCenter, cropMenuSize_item, cropMenu, sliderZoom, sliderZoom_Box
} from '@/style/style_mui/app.modalStyle';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CropDinIcon from '@mui/icons-material/CropDin';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import Crop169Icon from '@mui/icons-material/Crop169';
import Menu from "@mui/material/Menu";
import MuiSlider from '@mui/material/Slider';
import Image from "next/image";

type Props = {
    url: string;
    mediaFilesCrops: MediaFile[];
    setMediaFileDoneCrops: (mediaFileDoneCrops: any) => void;
};

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const CropOneImage = React.memo(function CropOneImage({ url, setMediaFileDoneCrops, }: Props) {
    const imgSrc = url;

    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [rotate, setRotate] = useState(0);
    const [zoom, setZoom] = useState<number>(1);
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(1);

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspectRatio) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspectRatio));
        }
    };

    useDebounceEffect(
        async () => {
            if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
                canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, zoom, rotate);
                const base64Image = previewCanvasRef.current.toDataURL('image/jpeg');
                handleSetFinal(base64Image);
            }
        }, 100,
        [completedCrop, zoom, rotate]
    );

    const handleSetFinal = (base64: string) => {
        const data: fMediaFile = {
            file: {
                url: imgSrc,
                base64: base64,
            },
            type: 'image',
        };

        setMediaFileDoneCrops((prev: fMediaFiles): fMediaFiles => {
            const existingMediaIndex = prev.findIndex((item: fMediaFile) => item?.file?.url === imgSrc);
            if (existingMediaIndex !== -1) {
                const updatedMediaFiles = [...prev];
                updatedMediaFiles[existingMediaIndex] = data;
                return updatedMediaFiles;
            }
            return [...prev, data];
        });
    };

    const [showSlider, setShowSlider] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleZoomChange = (event: Event, newValue: number | number[]) => setZoom(newValue as number);
    const handleAspectRatioChange = (ratio: number | undefined) => setAspectRatio(ratio);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleCompressClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleToggleSlider = () => setShowSlider(!showSlider);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sliderContainerRef.current && !sliderContainerRef.current.contains(event.target as Node)) {
                setShowSlider(false);
            }
        };

        if (showSlider) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSlider]);

    const handleActionCropOneImage = () => {
        return (
            <>
                <Box sx={{
                    position: 'absolute', zIndex: 2,
                    bottom: 0, left: 0, height: 80,
                    width: '50%',
                    background: 'none'
                }}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        padding: '20px'
                    }}>
                        <Box sx={flexCenterCenter}>
                            <IconButton onClick={handleCompressClick}
                                sx={{ marginRight: '20px', backgroundColor: '#434346' }}
                                ref={buttonRef}>
                                <FaCompress style={{ fontSize: 18, color: 'white' }} />
                            </IconButton>
                            <IconButton onClick={handleToggleSlider} sx={{ backgroundColor: '#434346' }}>
                                <FaSearchPlus style={{ fontSize: 18, color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                {showSlider && (
                    <Box ref={sliderContainerRef} sx={sliderZoom_Box}>
                        <MuiSlider value={zoom} min={1} max={2} step={0.1} defaultValue={0} onChange={handleZoomChange} aria-labelledby="zoom-slider" sx={sliderZoom} />
                    </Box>
                )}

                <Menu
                    id="aspect-ratio-menu"
                    anchorEl={buttonRef.current}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={cropMenu}
                >
                    <MenuItem onClick={() => handleAspectRatioChange(undefined)}
                        sx={{
                            ...cropMenuSize_item,
                            fontWeight: aspectRatio === undefined ? 1000 : 600, // Bold if selected
                            backgroundColor: aspectRatio === undefined ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
                        }}
                    >
                        <Typography sx={{ fontSize: 15 }}>Original</Typography>
                        <CropOriginalIcon sx={{ fontSize: 20 }} />
                    </MenuItem>
                    <MenuItem onClick={() => handleAspectRatioChange(1)}
                        sx={{
                            ...cropMenuSize_item,
                            fontWeight: aspectRatio === 1 ? 700 : 600, // Bold if selected
                            backgroundColor: aspectRatio === 1 ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
                        }}
                    >
                        <Typography sx={{ fontSize: 15 }}>1:1</Typography>
                        <CropDinIcon sx={{ fontSize: 20 }} />
                    </MenuItem>
                    <MenuItem onClick={() => handleAspectRatioChange(4 / 5)}
                        sx={{ ...cropMenuSize_item }}>
                        <Typography sx={{ fontSize: 15 }}>4:5</Typography>
                        <CropPortraitIcon sx={{ fontSize: 20 }} />
                    </MenuItem>
                    <MenuItem onClick={() => handleAspectRatioChange(16 / 9)}
                        sx={{ ...cropMenuSize_item }}>
                        <Typography sx={{ fontSize: 15 }}>16:9</Typography>
                        <Crop169Icon sx={{ fontSize: 20 }} />
                    </MenuItem>
                </Menu>
            </>
        );
    };

    return (
        <>
            <Box sx={{ width: '100%', height: '100%', background: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspectRatio}
                        minHeight={100}
                        style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', }}                     >
                        <div style={{ width: '800px', height: '800px', position: 'relative', overflow: 'hidden', }} >
                            <Image
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                layout="fill"
                                objectFit="contain"
                                style={{ transform: `scale(${zoom}) rotate(${rotate}deg)`, }}
                                onLoad={onImageLoad}
                            />
                        </div>
                    </ReactCrop>
                )}
                <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
            </Box>
            {handleActionCropOneImage()}
        </>
    );
});

export default CropOneImage;
