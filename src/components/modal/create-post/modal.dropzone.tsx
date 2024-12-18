'use client'
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Box from '@mui/material/Box';
import CollectionsIcon from '@mui/icons-material/Collections';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { MediaFile, IVideoFile, IImageFile } from "@/types/post";
import { locales } from "@/language/constant";

type Props = {
    setMediaFiles: React.Dispatch<React.SetStateAction<MediaFile[]>>;
    lang: keyof typeof locales;
}

export const generateThumbnails = (videoUrl: string, duration: number, count: number = 10): Promise<string[]> => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous';
        video.muted = true;

        // Create a canvas for drawing thumbnails
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const thumbnails: string[] = [];
        const captureInterval = duration / count;

        const captureFrame = (time: number) => {
            return new Promise<void>((captureResolve) => {
                video.currentTime = time;
                video.onseeked = () => {
                    // Set canvas dimensions based on video dimensions
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    // Draw the current frame onto the canvas
                    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Convert canvas to data URL (base64 image)
                    const thumbnailUrl = canvas.toDataURL('image/png');
                    thumbnails.push(thumbnailUrl);

                    captureResolve();
                };
            });
        };

        video.onloadedmetadata = async () => {
            for (let i = 0; i < count; i++) {
                const time = i * captureInterval;
                await captureFrame(time);
            }
            resolve(thumbnails); // Return generated thumbnails
        };
    });
};

export default function Dropzone({ setMediaFiles, lang }: Props) {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setLoading(true); // Start loading

        const mediaFilesPromises = acceptedFiles.map((file) => {
            const fileUrl = URL.createObjectURL(file);
            const fileType: 'video' | 'image' = file.type.startsWith('video') ? 'video' : 'image'; // Ensure strict typing for 'video' | 'image'
            const fileSize = file.size;

            if (fileType === 'video') {
                return new Promise<MediaFile>((resolve) => {
                    const video = document.createElement('video');

                    // Sử dụng URL của file để tính toán duration
                    video.src = fileUrl;
                    video.onloadedmetadata = async () => {
                        const thumbnails = await generateThumbnails(fileUrl, video.duration);

                        resolve({
                            file: {
                                url: fileUrl,
                                thumbnails,
                                duration: video.duration, // Lấy duration của video
                                timeStart: 0,  // Bắt đầu từ 0
                                timeEnd: video.duration,  // Thời gian kết thúc bằng duration
                                size: fileSize,
                                soundOn: true,
                            },
                            type: 'video',
                        });
                    };
                });
            } else {
                return Promise.resolve<MediaFile>({
                    file: {
                        url: fileUrl,
                        base64: '',
                        size: fileSize,
                    },
                    type: 'image',
                });
            }
        });

        // Khi tất cả các file đã được xử lý, cập nhật state
        Promise.all(mediaFilesPromises).then((mediaFiles) => {
            setMediaFiles((prevMediaFiles) => [...prevMediaFiles, ...mediaFiles]);
            setLoading(false); // Stop loading
        });
    }, [setMediaFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'video/mp4': [],
        }
    });

    return (
        <Box sx={{ width: 800, height: 750, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
                    <CircularProgress />
                    <Typography sx={{ marginLeft: 2 }}>{locales[lang]?.processingFilesPleaseWait}</Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CollectionsIcon style={{ fontSize: 100 }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Typography sx={{ fontSize: 30, fontWeight: 800 }}>{locales[lang]?.dragPhotosAndVideosHere}</Typography>
                    </Box>
                    <Box {...getRootProps()} sx={{ cursor: 'pointer' }}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <Typography sx={{ marginTop: 2 }}>{locales[lang]?.dropFilesHere}</Typography>
                        ) : (
                            <Box sx={{
                                backgroundColor: 'rgb(58, 145, 254)',
                                height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center',
                                borderRadius: 15, marginTop: '10px'
                            }}>
                                <Typography sx={{ color: 'white', fontWeight: 700, padding: 10 }}>{locales[lang]?.selectFromComputer}</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}
