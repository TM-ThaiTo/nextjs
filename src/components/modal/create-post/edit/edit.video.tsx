import React, { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import { Typography, Button, Switch, Slider, IconButton, ButtonBase } from "@mui/material";
import { PlayArrow } from '@mui/icons-material';
import { fVideoFile, fMediaFile, fMediaFiles } from "@/types/post";
import {
    edit_imgThumbnails, edit_boxEdit, edit_thumbnailsEdit, edit_addImage, edit_buttonSelectFromComputer, edit_trimVideo,
    edit_boxAction, edit_titleAction
} from '@/style/style_mui/app.modalStyle';

type Props = {
    video: fVideoFile;
    setMediaFileDoneEdits: (data: any) => void;
}

export default function EditVideoPost({
    video,
    setMediaFileDoneEdits,
}: Props) {
    const { url, thumbnails, duration, size, timeStart, timeEnd, soundOn } = video;
    const [isCoverImage, setIsCoverImage] = useState<string>(thumbnails[0]);
    const [appliedStartTime, setAppliedStartTime] = useState<number>(timeStart);
    const [appliedEndTime, setAppliedEndTime] = useState<number>(timeEnd);

    const [playing, setPlaying] = useState(false);
    const [isSound, setIsSound] = useState<boolean>(soundOn);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.currentTime = appliedStartTime; // Set video to start time

            const handleTimeUpdate = () => {
                if (video.currentTime >= appliedEndTime) {
                    video.pause();
                    setPlaying(false); // Reset play button when video ends
                }
            };

            video.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [appliedStartTime, appliedEndTime]);

    useEffect(() => {
        if (
            isCoverImage !== thumbnails[0] ||
            appliedStartTime !== timeStart ||
            appliedEndTime !== timeEnd ||
            isSound !== soundOn
        ) {
            setHasChanges(true); // There are changes
        } else {
            setHasChanges(false); // No changes detected
        }
    }, [isCoverImage, appliedStartTime, appliedEndTime, isSound, soundOn, thumbnails, timeStart, timeEnd]);

    const handleThumbnailClick = (index: number) => {
        setIsCoverImage(thumbnails[index]);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setIsCoverImage(fileUrl);
        }
    };

    const handleSelectFromComputerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleTrimChange = (event: Event, newValue: number | number[]) => {
        const [start, end] = newValue as number[];
        setAppliedStartTime(start);
        setAppliedEndTime(end);
    };

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setPlaying(true);
        }
    };

    const handleSave = () => {

        const finalVideo: fMediaFile = {
            file: {
                url: url,
                thumbnails: thumbnails,
                thumbnail: isCoverImage,
                duration: appliedEndTime - appliedStartTime,
                timeStart: appliedStartTime,
                timeEnd: appliedEndTime,
                soundOn: isSound,
                size: size,
            },
            type: 'video',
        }
        setMediaFileDoneEdits((prev: fMediaFiles): fMediaFiles => {
            const existingMediaIndex = prev.findIndex((item: fMediaFile) => item?.file?.url === url);

            if (existingMediaIndex !== -1) {
                const updatedMediaFiles = [...prev];
                updatedMediaFiles[existingMediaIndex] = finalVideo; // Thay thế giá trị tại vị trí tìm thấy
                return updatedMediaFiles; // Trả về mảng mới đã cập nhật
            }
            return [...prev, finalVideo];
        });
    };

    return (
        <Box sx={edit_boxEdit}>
            <Box sx={{ marginBottom: 2, width: '100%' }}>
                <Box sx={edit_boxAction}>
                    <Typography variant="h6" sx={edit_titleAction}>
                        Cover Photo
                    </Typography>
                    <Box>
                        <Typography
                            component="span"
                            sx={edit_buttonSelectFromComputer}
                            onClick={handleSelectFromComputerClick}
                        >
                            Select from computer
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                        />
                    </Box>
                </Box>
                {isCoverImage && (
                    <Box component="img" src={isCoverImage} alt="Cover" sx={edit_addImage} />
                )}
            </Box>

            <Box sx={{ ...edit_thumbnailsEdit, width: `${thumbnails.length * 105}px` }}>
                {thumbnails.map((thumbnail, index) => (
                    <Box
                        component='img'
                        key={index}
                        src={thumbnail}
                        alt={`Thumbnail ${index}`}
                        onClick={() => handleThumbnailClick(index)}
                        sx={{ ...edit_imgThumbnails, opacity: isCoverImage === thumbnail ? 1 : 0.6 }}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex', width: '100%', height: 200, position: 'relative', marginTop: 2 }}>
                <Box component="video" ref={videoRef} muted={soundOn}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} controls={false}
                >
                    <source src={url} type="video/mp4" />
                </Box>

                {/* Custom Play Button */}
                {!playing && (
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, }}>
                        <IconButton
                            onClick={handlePlay}
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                                padding: '20px',
                                borderRadius: '50%',
                            }}
                        >
                            <PlayArrow sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Box>
                )}
            </Box>

            <Box sx={edit_trimVideo}>
                <Typography variant="h6" sx={edit_titleAction}>Trim Video</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Slider
                        value={[appliedStartTime, appliedEndTime]}
                        min={0} max={duration} step={0.1}
                        onChange={handleTrimChange}
                        valueLabelDisplay="auto"
                    />
                </Box>
            </Box>

            {/* Sound Toggle Section */}
            <Box sx={edit_boxAction}>
                <Typography variant="h6" sx={edit_titleAction}>Sound On</Typography>
                <Switch checked={isSound} onChange={() => setIsSound(!isSound)} inputProps={{ 'aria-label': 'controlled' }} />
            </Box>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave} disabled={!hasChanges}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}
