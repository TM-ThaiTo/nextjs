'use server';

import { api } from "@/utils/api";
import { revalidateTag } from "next/cache";

const url = '/follows';

const accept_follow = async (dto: any) => {
    const urlPut = `${url}/accept-follow`;
    const { data, error } = await api<any>(urlPut, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dto)
    })
    if (data) { revalidateTag('load-notification'); revalidateTag('load-notification-follow'); }
    return { data, error }
}

export {
    accept_follow,
}