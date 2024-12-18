import { api } from "@/utils/api";
import queryString from "query-string";


const crateMessage = async (dto: any) => {
    const url = `/message-group`;
    const { data, error } = await api(url, {
        method: 'POST',
        body: dto,
    });
    return { data, error }
}

const getMessageGroup = async (id: string, page: number, limit: number) => {
    const query = queryString.stringify({ id, page, limit });
    const url = `/message-group/room?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return { data, error }
}

export {
    crateMessage,
    getMessageGroup
}