'use client'

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slider from "react-slick";
import { settings } from "@/helper/settingSlider";
import { MediaFile, fImageFile, fMediaFile, fMediaFiles } from "@/types/post";
import { actionButtonStyle, commonStyles, titleStyle } from "@/style/style_mui/app.modalStyle";
import ShareCaption from "./share.caption";
import renderOneShareVideo from "./render.oneVideo";

type Props = {
    myUser: any;
    mediaFiles: MediaFile[];
    finalMediaEdit: fMediaFiles;
    handleBackEditMedia: () => void;
}

export const SharePost = ({
    myUser,
    mediaFiles,
    finalMediaEdit,
    handleBackEditMedia
}: Props) => {
    const finalMediaShare = finalMediaEdit;
    const [onSharePost, setOnSharePost] = useState<boolean>(false);
    const [isShareMedia, setIsShareMedia] = useState<boolean>(true);
    const sliderRef = useRef<Slider>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const renderOneShareImage = (item: fMediaFile) => {
        const file = item?.file as fImageFile;
        const url = file?.base64 || file?.url;
        return (
            <Box sx={{ width: 810, height: 809, backgroundColor: 'none' }}>
                <Box component='img' src={url} alt='image' sx={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    borderBottomLeftRadius: '15px',
                }} />
            </Box>
        );
    }
    const handleBeforeChange = (oldIndex: number, newIndex: number) => {
        if (newIndex > oldIndex) setCurrentIndex(newIndex);
        else return false;
    };
    const handleRenderItemMedia = () => {
        const current = finalMediaEdit.length;
        return (
            <div style={{ width: '100%', height: 800 }}>
                <Slider
                    ref={sliderRef}
                    {...{ ...settings(sliderRef, currentIndex, current), speed: 0 }}
                    beforeChange={handleBeforeChange}
                    afterChange={setCurrentIndex}
                >
                    {finalMediaEdit.map((item, index) => (
                        <Box key={index} >
                            <Box sx={{
                                width: 810, height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                {item?.type === 'image'
                                    ? renderOneShareImage(item as fMediaFile)
                                    : renderOneShareVideo(item as fMediaFile)
                                }
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </div >
        )
    }
    const handleBackComponentEditMedia = () => {
        setIsShareMedia(false);
        setOnSharePost(false);
        handleBackEditMedia();
    }
    const handleShareMedia = () => {
        setOnSharePost(true);
    }
    const renderBoxCaption = () => <ShareCaption myUser={myUser} finalMediaShare={finalMediaShare} onSharePost={onSharePost} />

    return (
        <>
            {isShareMedia && (
                <>
                    <Box sx={{ height: 42, width: 1150, borderBottom: "1px solid gray" }}>
                        <Box sx={commonStyles}>
                            <ButtonBase onClick={handleBackComponentEditMedia}>
                                <ArrowBackIcon />
                            </ButtonBase>
                            <Typography sx={titleStyle}>Create new post</Typography>
                            <ButtonBase onClick={handleShareMedia} >
                                <Typography sx={actionButtonStyle}>Share</Typography>
                            </ButtonBase>
                        </Box>
                    </Box>

                    <Box sx={{ height: 810, width: 1150, display: 'flex' }}>
                        <Box sx={{ height: 800, width: 810 }}>
                            {handleRenderItemMedia()}
                        </Box>
                        <Box sx={{ height: 800 }}>
                            {renderBoxCaption()}
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}