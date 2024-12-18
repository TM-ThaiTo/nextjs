'use server'

import { ResponseMessages } from "@/types/message";
import { api } from "@/utils/api";
import queryString from "query-string";

const getMessage = async (id: string, page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/message/${id}?${query}`;
    const { data, error } = await api<ResponseMessages>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return { data, error };
}

export {
    getMessage,
}