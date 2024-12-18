import { api } from "@/utils/api"
import queryString from "query-string";

const getAllPostAdmin = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/post/admin/all?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
    return { data, error };
}

const getSearchPostAdmin = async (
    id: string,
    idUser: string,
    slug: string,
    page: number,
    limit: number
) => {
    const query = queryString.stringify({ id, idUser, slug, page, limit });
    const url = `/post/admin/search?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
    return { data, error };
}

export {
    getAllPostAdmin,
    getSearchPostAdmin
}