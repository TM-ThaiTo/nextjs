'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { useSocket } from "@/utils/socket/socket.context";
import { Messages, Message, ResponseMessages } from "@/types/message";
import RenderContentMessage from '@/components/message/render/content.message';
import { getMessage } from '@/actions/message/actions';
import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

type ContentMessageProps = {
    room: any
    myUser: any;
    recipient: any;
    fMessages: ResponseMessages;
}

export default function ContentMessage({ room, myUser, recipient, fMessages, }: ContentMessageProps) {
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { textColorPrimary } = useThemeColors();

    const { socket } = useSocket();
    const limit = 20;
    const id = room?._id;
    const { data: oMessages, page: oPage, totalPage: oTotalPage } = fMessages;

    const [messages, setMessages] = useState<Messages>(oMessages);
    const [totalPage, setTotalPage] = useState<number>(oTotalPage);
    const [page, setPage] = useState<number>(oPage);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesTopRef = useRef<HTMLDivElement>(null);
    const hasScrolledRef = useRef(false);

    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

    const handleFetchMessages = useCallback(async () => {
        if (!id || page > totalPage || !hasMore) return;

        setIsLoadMore(true);
        try {
            const newPage = page + 1;
            const { data, error } = await getMessage(id, newPage, limit);
            if (error) { setMessages([]); setIsLoadMore(false); return; }
            if (data) {
                const fetchedMessages = data?.data;
                setMessages((prevMessages: any) => [
                    ...prevMessages,
                    ...fetchedMessages
                ]);
                setTotalPage(data?.totalPage);
                setHasMore(page < data?.totalPage);
                setPage(data?.page);
                setIsLoadMore(false);
            }
        } catch (error) { console.error("Error fetching messages:", error); setIsLoadMore(false); }
    }, [id, page, totalPage, hasMore, limit]);

    const handleScroll = useCallback(() => { if (messagesTopRef.current?.scrollTop === 0 && hasMore && page <= totalPage) { handleFetchMessages(); } }, [hasMore, page, totalPage, handleFetchMessages]);

    useEffect(() => {
        if (messagesEndRef.current && page === 1 && !hasScrolledRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            hasScrolledRef.current = true;
        }
    }, [messages, hasScrolledRef, page]);

    useEffect(() => {
        const currentRef = messagesTopRef.current;
        if (currentRef) currentRef.addEventListener('scroll', handleScroll);
        return () => {
            if (currentRef) currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, messagesTopRef, hasMore, page, totalPage]);

    const handleSocketNewMessage = useCallback((newMessage: Message) => {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        setTimeout(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, []);
    const handleSocketUnSend = useCallback((data: any) => {
        setMessages((prevMessages) => {
            prevMessages.map((messageItem) => {
                if (messageItem.message._id === data?.message?._id) {
                    messageItem.message.content = 'This message was deleted';
                }
                return messageItem;
            });
            return [...prevMessages];
        });
    }, []);
    useEffect(() => {
        if (socket) {
            socket.emit('onConversationJoin', id);
            socket.on('onMessage', handleSocketNewMessage);
            socket.on('onUnsend', handleSocketUnSend);
            return () => {
                socket.emit('onConversationLeave', id);
                socket.off('onMessage', handleSocketNewMessage);
                socket.off('onUnsend', handleSocketUnSend);
            };
        }
    }, [socket, id, handleSocketNewMessage, handleSocketUnSend]);


    return (
        <Box ref={messagesTopRef} sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {isLoadMore && <Box sx={{ height: 30, display: 'flex', justifyContent: 'center' }}> <CircularProgress /> </Box>}
            <RenderContentMessage messages={messages} myUser={myUser} room={room} />
            {!isLoadMore && messages.length === 0 && <Typography component="span" sx={{ color: textColorPrimary }}>{locales[lang]?.message?.contentMessage?.noComment}</Typography>}
            <div ref={messagesEndRef} />
        </Box>
    );
}
