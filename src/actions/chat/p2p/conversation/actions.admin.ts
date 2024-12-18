
import { api } from "@/utils/api";
import queryString from "query-string";

const getAllConversation = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/conversation/admin/all?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['get-conversation'] }
    })
    return { data, error }
}

const searchConversation = async (
    page: number,
    limit: number,
    id: string,
    slug: string,
    creator: string,
    recipient: string,
) => {
    const query = queryString.stringify({ page, limit, id, slug, creator, recipient });
    const url = `/conversation/admin/search?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['search-conversation'] }
    })
    return { data, error }
}

export {
    getAllConversation,
    searchConversation
}