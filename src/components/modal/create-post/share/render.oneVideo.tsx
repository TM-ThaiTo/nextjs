import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { fMediaFile, fVideoFile } from "@/types/post";

const RenderOneShareVideo = (item: fMediaFile) => {
    const file = item?.file as fVideoFile;
    const { url, thumbnail, duration, timeStart, timeEnd, size, soundOn } = file;
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement && timeStart !== undefined) {
            videoElement.currentTime = timeStart;

            const handleTimeUpdate = () => {
                if (timeEnd !== undefined && videoElement.currentTime >= timeEnd) {
                    videoElement.pause();
                }
            };

            videoElement.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [timeStart, timeEnd]);

    const baseMaxSize = 810;  // Kích thước tối đa cho cả chiều rộng và chiều cao

    const getAspectRatio = (size: number | undefined) => {
        let width = baseMaxSize;
        let height = baseMaxSize;

        if (size && size > 0) {
            height = baseMaxSize / size;  // Tính chiều cao dựa trên tỷ lệ khung hình (size)
        }

        // Kiểm tra nếu một trong hai chiều vượt quá baseMaxSize, điều chỉnh lại để không vượt quá 810px
        if (width > baseMaxSize) {
            height = (height / width) * baseMaxSize;
            width = baseMaxSize;
        }

        if (height > baseMaxSize) {
            width = (width / height) * baseMaxSize;
            height = baseMaxSize;
        }

        return { width, height };
    };

    const { width, height } = getAspectRatio(size);

    return (
        <Box sx={{ width: 810, height: 810, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{ width: width, height: height, overflow: 'hidden', position: 'relative' }}>
                <Box
                    component="video"
                    ref={videoRef}
                    autoPlay
                    loop={timeEnd === undefined} // Không lặp nếu có `timeEnd`
                    muted={!soundOn} // Tắt tiếng nếu `soundOn` là false
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                >
                    <source src={url} type="video/mp4" />
                </Box>
            </Box>
        </Box>
    )
}

export default RenderOneShareVideo;