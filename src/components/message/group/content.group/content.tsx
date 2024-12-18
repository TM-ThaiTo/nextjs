'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { Messages, Message } from "@/types/message";
import { useSocket } from "@/utils/socket/socket.context";
import { getMessageGroup } from "@/actions/chat/group/message/actions";
import RenderContentMessageGroup from "./render.content";
import importThemeAndLanguge from "@/helper/importThemeAndLanguge";

type ContentMessageProps = {
    room: any
    myUser: any;
    fMessages: any;
}

export default function ContentGroupMessage({ room, myUser, fMessages }: ContentMessageProps) {
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { socket } = useSocket();

    const limit = 5;
    const id = room?.idConversation;
    const { messages: oMessages, page: oPage, totalPage: oTotalPage } = fMessages;

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
            const { data, error } = await getMessageGroup(id, newPage, limit);
            if (error) { setMessages([]); setIsLoadMore(false); return; }
            if (data) {
                const message = data?.messages;
                setMessages((prevMessages: any) => [...prevMessages, ...message]);
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
            socket.emit('onConversationGroupJoin', id);
            socket.on('onMessageGroup', handleSocketNewMessage);
            // socket.on('onUnsend', handleSocketUnSend);
            return () => {
                socket.emit('onConversationGroupLeave', id);
                socket.off('onMessageGroup', handleSocketNewMessage);
                // socket.off('onUnsend', handleSocketUnSend);
            };
        }
    }, [socket, id, handleSocketNewMessage, handleSocketUnSend]);

    return (
        <Box ref={messagesTopRef} sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {isLoadMore && <Box sx={{ height: 30, display: 'flex', justifyContent: 'center' }}> <CircularProgress /> </Box>}
            <RenderContentMessageGroup messages={messages} myUser={myUser} room={room} />
            {!isLoadMore && messages.length === 0 && <Typography component="span">{locales[lang]?.message?.contentMessage?.noComment}</Typography>}
            <div ref={messagesEndRef} />
        </Box>
    );
}
