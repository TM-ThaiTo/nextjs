import { cropMenu, cropMenuSize_item, cropVideoCreatePost, flexCenterCenter } from "@/style/style_mui/app.modalStyle";
import { MediaFile, fMediaFile, fMediaFiles, fVideoFile } from "@/types/post";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CropDinIcon from '@mui/icons-material/CropDin';
import CropPortraitIcon from '@mui/icons-material/CropPortrait';
import Crop169Icon from '@mui/icons-material/Crop169';
import Menu from "@mui/material/Menu";
import MuiSlider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import { FaCompress, FaPlus, FaSearchPlus } from "react-icons/fa";

type Props = {
    url: string;
    mediaFilesCrops: MediaFile;
    setMediaFileDoneCrops: (mediaFileDoneCrops: any) => void;
}

export default function CropOneVideo({
    url,
    mediaFilesCrops,
    setMediaFileDoneCrops
}: Props) {
    const [aspectRatio, setAspectRatio] = useState<number | undefined>(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleAspectRatioChange = (ratio: number | undefined) => setAspectRatio(ratio);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleCompressClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const renderVideo = (url: string) => {
        const isFullOr169 = aspectRatio === undefined || aspectRatio === (16 / 9);
        return (
            <Box
                sx={{
                    position: 'relative',
                    height: isFullOr169 ? 450 : 810,
                    width: isFullOr169 ? 810 : '100%',
                    overflow: 'hidden',
                    borderBottomLeftRadius: isFullOr169 ? 'none' : '15px',
                    borderBottomRightRadius: isFullOr169 ? 'none' : '15px',
                }}
            >
                <Box component="video" controls={false} autoPlay loop sx={cropVideoCreatePost} >
                    <source src={url} type="video/mp4" />
                </Box>
            </Box>
        )
    }

    useEffect(() => {
        const file = mediaFilesCrops?.file as fVideoFile;

        const data: fMediaFile = {
            file: {
                url: url,
                thumbnails: file?.thumbnails || [],
                thumbnail: '',
                duration: file?.duration || 0,
                timeStart: file?.timeStart || 0,
                timeEnd: file?.timeEnd || 0,
                size: aspectRatio === undefined ? 0 : aspectRatio,
                soundOn: true,
            },
            type: 'video'
        }

        setMediaFileDoneCrops((prev: fMediaFiles): fMediaFiles => {
            const existingMediaIndex = prev.findIndex((item: fMediaFile) => item?.file?.url === url);

            if (existingMediaIndex !== -1) {
                const updatedMediaFiles = [...prev];
                updatedMediaFiles[existingMediaIndex] = data;
                return updatedMediaFiles;
            }
            return [...prev, data];
        });

    }, [aspectRatio, setMediaFileDoneCrops, mediaFilesCrops, url]);

    const renderAcionCropVideo = () => {
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
                        </Box>
                    </Box>
                </Box>

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
                    <MenuItem onClick={() => handleAspectRatioChange(9 / 16)}
                        sx={{ ...cropMenuSize_item }}>
                        <Typography sx={{ fontSize: 15 }}>9:16</Typography>
                        <CropPortraitIcon sx={{ fontSize: 20 }} />
                    </MenuItem>
                    <MenuItem onClick={() => handleAspectRatioChange(16 / 9)}
                        sx={{ ...cropMenuSize_item }}>
                        <Typography sx={{ fontSize: 15 }}>16:9</Typography>
                        <Crop169Icon sx={{ fontSize: 20 }} />
                    </MenuItem>
                </Menu>
            </>
        )
    }

    return (
        <>
            <>{url && renderVideo(url)}</>
            <>{renderAcionCropVideo()}</>
        </>
    )
}