import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import { settings } from '@/helper/settingSlider';
import { FaPlay } from "react-icons/fa";

type Props = {
    listUrl: any[],
    h?: string | number;
    w?: string | number;
    o?: string;
}

const boxVideo = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}

const boxComponentVideo = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Đảm bảo ảnh lấp đầy khung hình
    transition: 'opacity 0.5s ease', // Thêm hiệu ứng chuyển đổi
    zIndex: 1,
}

const buttonPlay = {
    position: 'absolute',
    zIndex: 2,
    color: 'white',
    background: 'rgba(0, 0, 0, 0.5)', // Màu nền đen trong suốt
    width: '64px', // Kích thước nút Play
    height: '64px',
    borderRadius: '50%', // Nút tròn
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tăng độ đậm khi hover
    },
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Thêm shadow cho nút
}

export default function RenderVideo({
    listUrl,
    h = "100%", // Mặc định chiều cao
    w = "100%", // Mặc định chiều rộng
    o = "cover" // Mặc định cách hiển thị video
}: Props) {
    const [isPlaying, setIsPlaying] = useState(false); // State để kiểm tra trạng thái phát video
    const videoRef = useRef<HTMLVideoElement | null>(null); // Ref để truy cập video

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play(); // Bắt đầu phát video
        }
        setIsPlaying(true); // Đặt trạng thái phát video là true
    };

    return (
        <Box sx={{ height: h, width: w, ...boxVideo, }} >
            {!isPlaying && listUrl[0].thumbnail && (
                <Box
                    component='img'
                    src={listUrl[0].thumbnail}
                    alt="Thumbnail"
                    sx={{ ...boxComponentVideo, opacity: isPlaying ? 0 : 1, }}
                />
            )}
            <Box
                component='video'
                ref={videoRef}
                controls
                sx={{ width: '100%', height: '100%', objectFit: o, zIndex: 0, }}
            >
                <source src={listUrl[0].url} type="video/mp4" />
            </Box>
            {!isPlaying && (
                <Button onClick={handlePlay} variant="contained" sx={buttonPlay} >
                    <FaPlay size={24} />
                </Button>
            )}
        </Box>
    );
}
