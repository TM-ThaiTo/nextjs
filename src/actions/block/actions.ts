'use server'

import { api } from "@/utils/api"
import { revalidateTag } from "next/cache";
import queryString from "query-string";

const checkBlock = async (id: string) => {
    const url = `/block/check/${id}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        next: { tags: ['check-block'] }
    });
    return { data, error };
}

const postBlock = async (dto: any) => {
    const url = `/block`
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dto),
    })
    return { data, error }
}

const deleteBlock = async (dto: any) => {
    const url = `/block`
    const { data, error } = await api<any>(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dto),
    })
    if (data) revalidateTag('get-block');
    return { data, error }
}

const findDataBlock = async (page: number = 1, limit: number = 100) => {
    const query = queryString.stringify({ page, limit });
    const url = `/block?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        next: { tags: ['get-block'] }
    })
    return { data, error }
}
export {
    checkBlock,
    postBlock,
    deleteBlock,
    findDataBlock
}