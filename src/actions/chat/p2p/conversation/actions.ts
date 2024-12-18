'use server'

import { Rooms } from "@/types/message";
import { api } from "@/utils/api";
import { revalidateTag } from "next/cache";

const getDetailCallConversation = async (room: string) => {
    return await api<any>(`/conversation/room/${room}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    })
}

const getConversation = async () => {
    const url = `/conversation`;
    const { data, error } = await api<Rooms>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        next: {
            tags: ['get-conversation']
        }
    });
    return { data, error }
}

const revalidateTagGetConversation = () => revalidateTag('get-conversation');

const getRoomBySlugConversation = async (slug: string) => {
    const url = `/conversation/room/${slug}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return { data, error }
}

const createConversation = async (dataC: any) => {
    const url = `/conversation`;
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dataC),
    });
    return { data, error }
}

const getConversationPadding = async () => {
    const url = `/conversation/padding`;
    const { data, error } = await api<Rooms>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    });
    return { data, error }
}

const deleteMessageConversation = async (id: string) => {
    const url = `/conversation/${id}`;
    const { data, error } = await api<any>(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
    })
    if (data) revalidateTag('get-conversation');
    return { data, error }
}
export {
    revalidateTagGetConversation,

    getDetailCallConversation,
    getConversation,
    getRoomBySlugConversation,
    createConversation,
    getConversationPadding,
    deleteMessageConversation
}