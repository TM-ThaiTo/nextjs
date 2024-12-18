'use server';

import { api } from "@/utils/api";
import queryString from "query-string";

const findUser = async (search: string, page: number = 1, limit: number = 5) => {
    try {
        const key = search.trim();
        const query = queryString.stringify({ key, page, limit });
        const url = `/user/find-user?${query}`;

        const response = await api<any>(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            next: { tags: ['find-user'] },
        });

        return { data: response.data, error: response.error || null };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { data: null, error };
    }
}


export {
    findUser
}