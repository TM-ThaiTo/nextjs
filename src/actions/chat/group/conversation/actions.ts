'use server'

import { api } from "@/utils/api"
import { revalidateTag } from "next/cache";
import queryString from "query-string";

const createGroupMessage = async (dataC: any) => {
    const url = '/conversation-group'
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dataC),
    });
    return { data, error }
}

const getGroup = async () => {
    const url = '/conversation-group/all'
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        next: {
            tags: ['get-group']
        }
    });
    return { data, error }
}

const getGroupBySlug = async (slug: string) => {
    const url = `/conversation-group/room/${slug}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    });
    return { data, error }
}

const findUserAddMember = async (
    key: string,
    slug: string,
    page: number = 1,
    limit: number = 5
) => {
    const query = queryString.stringify({ key, slug, page, limit });
    const url = `/conversation-group/find-user?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    });
    return { data, error }
}

const addMemberConversation = async (dto: any) => {
    const url = `/conversation-group/add-member`;
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dto),
    });
    if (data) revalidateTag('get-conversation');
    return { data, error }
}

const searchMember = async (
    key: string,
    slug: string,
    page: number = 1,
    limit: number = 5
) => {
    const query = queryString.stringify({ key, slug, page, limit });
    const url = `/conversation-group/search-member?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
    });
    return { data, error }
}

const deleteMemberConversation = async (dto: any) => {
    const url = `/conversation-group/delete-member`;
    const { data, error } = await api<any>(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(dto),
    });
    if (data) revalidateTag('get-conversation');
    return { data, error }
}
export {
    createGroupMessage,
    getGroup,
    getGroupBySlug,
    findUserAddMember, searchMember,
    addMemberConversation,
    deleteMemberConversation
}