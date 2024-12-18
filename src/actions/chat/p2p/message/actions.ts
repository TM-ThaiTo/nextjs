'use server';

import { ResponseMessages } from "@/types/message";
import { api } from "@/utils/api";
import { revalidateTag } from "next/cache";
import queryString from "query-string";

const getMessageByConvesations = async (room: string, page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/message/${room}?${query}`
    const { data, error } = await api<ResponseMessages>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return { data, error }
}

const createMessage = async (formData: any) => {
    const { data, error } = await api('/message', {
        method: 'POST',
        body: formData,
    });
    return { data, error }
}

export {
    getMessageByConvesations,
    createMessage,
}