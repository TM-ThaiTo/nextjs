'use server';

import { api } from "@/utils/api";
import { revalidateTag } from "next/cache";
import queryString from "query-string";

const url = '/notification';

const getNotification = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const urlGet = `${url}?${query}`
    const { data, error } = await api<any>(urlGet, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['load-notification'] }
    })
    return { data, error };
}
const getNotificationFollow = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const urlGet = `${url}/follow`
    const { data, error } = await api<any>(urlGet, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['load-notification-follow'] }
    })
    return { data, error };
}

const getNotificationPost = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const urlGet = `${url}/post`
    const { data, error } = await api<any>(urlGet, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['load-notification-post'] }
    })
    return { data, error };
}

const putUpateIsRead = async (dataU: any) => {
    const { data, error } = await api<any>(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify(dataU)
    })
    return { data, error };
}

const deleteNotification = async (dto: any) => {
    const urlDelete = `${url}/reject-follow`;
    const { data, error } = await api<any>(urlDelete, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify(dto)
    })
    if (data) { revalidateTag('load-notification'); revalidateTag('load-notification-follow'); }
    return { data, error };
}
export {
    getNotification,
    getNotificationFollow, getNotificationPost,
    putUpateIsRead,
    deleteNotification,
}