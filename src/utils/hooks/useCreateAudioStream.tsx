import { useEffect, useState, useRef } from 'react';

export const useCreateAudioStream = () => {
    const [userAudioStream, setUserAudioStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const createAudioStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

                setUserAudioStream(stream);
            } catch (error) {
                console.error('Error accessing audio stream:', error);
            }
        };

        createAudioStream();

        return () => {
            userAudioStream?.getTracks().forEach(track => track.stop());
        };
    }, [userAudioStream]);

    return { userAudioStream };
};
