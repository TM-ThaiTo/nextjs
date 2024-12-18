'use client'

import { useEffect, useState } from 'react';
import { useSocket } from '@/utils/socket/socket.context';

type Props = {
    open: boolean;
    setOpenModalCall: (open: boolean) => void;
    setDataCall: (data: any) => void;
    myUser: any;
};

export function useVoiceCall() {
    const { socket } = useSocket();
    const [incomingCallData, setIncomingCall] = useState<any>(null);

    useEffect(() => {
        if (socket) {
            socket.on('onVoiceCall', handleIncomingCall);
            socket.on('incomingCall', handleIncomingCall);
            socket.on('doneCallVoice', handleDoneCallVoice);

            return () => {
                socket.off('onVoiceCall', handleIncomingCall);
                socket.off('incomingCall', handleIncomingCall);
                socket.off('doneCallVoice', handleDoneCallVoice);
            };
        }
    }, [socket]);

    const handleIncomingCall = (data: any) => {
        setIncomingCall(data);
        localStorage.setItem('incomingCall', JSON.stringify(data));
    };
    const handleDoneCallVoice = () => {
        setIncomingCall(null);
        localStorage.removeItem('incomingCall');
    };

    return { incomingCallData };
}