import { useState, useRef, useEffect } from 'react';

export const useMicrophone = (initialState: boolean) => {
    const [isMicOn, setIsMicOn] = useState<boolean>(initialState);
    const streamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

    useEffect(() => {
        if (isMicOn) {
            startMic();
        } else {
            stopMic();
        }
    }, [isMicOn]);

    const startMic = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                setAudioChunks((prev) => [...prev, event.data]);
            };

            mediaRecorder.start();
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setIsMicOn(false);
        }
    };

    const stopMic = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                if (track.kind === 'audio') {
                    track.stop();
                }
            });
            streamRef.current = null;
        }
    };

    const getRecordedAudio = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        return audioBlob;
    };

    return { isMicOn, setIsMicOn, getRecordedAudio, streamRef };
};