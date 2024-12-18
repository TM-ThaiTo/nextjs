'use client'
import Slider from "react-slick";
import { useState, useRef, useCallback } from "react";
import { Box, ButtonBase } from "@mui/material";
import { settings } from '@/helper/settingSlider'
import { MediaFile, IVideoFile, IImageFile, fMediaFile, fMediaFiles, fVideoFile, fImageFile } from "@/types/post";

import EditImagePost from '@/components/modal/create-post/edit/edit.image'
import { commonStyles, actionButtonStyle, titleStyle } from "@/style/style_mui/app.modalStyle";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";
import { SharePost } from "../share/modal.sharePost";
import EditVideoPost from "./edit.video";
import { getLanguage } from "@/helper/mapTypesLanguage";
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { locales } from "@/language/constant";

type Props = {
    myUser: any;
    mediaFiles: MediaFile[];
    finalMediaFiles: fMediaFiles;
    handleBackCropMedia: () => void;
}

export default function EditPost({ myUser, mediaFiles, finalMediaFiles, handleBackCropMedia }: Props) {
    const lang = getLanguage();
    const { textColorPrimary, borderColor, linkColor, backgroundColor } = useThemeColors()

    const [mediaFileDoneEdits, setMediaFileDoneEdits] = useState<fMediaFiles>(finalMediaFiles);
    const [isEditMedia, setIsEditMedia] = useState<boolean>(true);
    const [isShareMedia, setIsShareMedia] = useState<boolean>(false);
    const sliderRef = useRef<Slider>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleBackEditMedia = () => {
        setMediaFileDoneEdits(finalMediaFiles);
        setIsEditMedia(true);
        setIsShareMedia(false);
    }
    const renderEditOneVideo = (mediaFile: fMediaFile) => {
        const file = mediaFile?.file as fVideoFile;
        return (
            <>
                <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
                    {renderVideo(file?.url)}
                </Box>
                <EditVideoPost video={file} setMediaFileDoneEdits={setMediaFileDoneEdits} />
            </>
        )
    }
    const renderEditOneImage = (mediaFile: fMediaFile) => {
        const file = mediaFile?.file as fImageFile;
        return <EditImagePost image={file} setMediaFileDoneEdits={setMediaFileDoneEdits} />
    }

    if (isShareMedia) return <SharePost myUser={myUser} mediaFiles={mediaFiles} finalMediaEdit={mediaFileDoneEdits} handleBackEditMedia={handleBackEditMedia} />

    const renderVideo = (url: string) => {
        return (
            <Box sx={{ height: 810 }}>
                <Box component="video" controls={false} src={url}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} >
                    <source src={url} type="video/mp4" />
                </Box>
            </Box>
        );
    };
    const handleBeforeChange = (oldIndex: number, newIndex: number) => {
        if (newIndex > oldIndex) setCurrentIndex(newIndex);
        else return false;
    };
    const renderItemEdit = (finalMediaFiles: fMediaFiles) => {
        const current = finalMediaFiles.length;
        return (
            <Slider
                ref={sliderRef} beforeChange={handleBeforeChange} afterChange={setCurrentIndex}
                {...{ ...settings(sliderRef, currentIndex, current), speed: 0 }}
            >
                {finalMediaFiles.map((item, index) => (
                    <Box key={index} sx={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Box sx={{
                            width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px',
                            backgroundColor: backgroundColor,
                        }}>
                            {item?.type === 'image'
                                ? renderEditOneImage(item)
                                : renderEditOneVideo(item)
                            }
                        </Box>
                    </Box>
                ))}
            </Slider>
        )
    }
    const handleNext = () => { setIsEditMedia(false); setIsShareMedia(true); }
    const handleBackComponentCropMedia = () => { setMediaFileDoneEdits([]); handleBackCropMedia(); }
    return (
        <>
            {isEditMedia && (
                <>
                    <Box sx={{ height: 42, borderBottom: "1px solid gray" }}>
                        <Box sx={commonStyles}>
                            <ButtonBase onClick={handleBackComponentCropMedia}>
                                <ArrowBackIcon />
                            </ButtonBase>
                            <Typography sx={{ ...titleStyle, color: textColorPrimary }}>{locales[lang]?.edit}</Typography>
                            <ButtonBase onClick={handleNext}>
                                <Typography sx={{ ...actionButtonStyle, color: linkColor }}>{locales[lang]?.next}</Typography>
                            </ButtonBase>
                        </Box>
                    </Box>
                    <Box sx={{ height: 810, width: 1150 }}>
                        {renderItemEdit(mediaFileDoneEdits)}
                    </Box>
                </>
            )}
        </>
    )
}