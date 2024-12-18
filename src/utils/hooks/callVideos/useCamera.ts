'use client'

import { useState, useRef, useEffect } from 'react';

export const useCamera = (initialState: boolean) => {
    const [isCameraOn, setIsCameraOn] = useState<boolean>(initialState);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        if (isCameraOn) {
            startCamera();
        } else {
            stopCamera();
        }
    }, [isCameraOn]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            streamRef.current = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
            setIsCameraOn(false);
        }
    };

    const stopCamera = () => {
        try {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    if (track.kind === 'video') {
                        track.stop();
                    }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                }
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setIsCameraOn(true);
        }
    };

    return { isCameraOn, setIsCameraOn, videoRef };
};