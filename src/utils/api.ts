'use server'
import { GetAccessToken } from "@/session/token";
import { TResponse } from "./lib.types";

const baseUrl = process.env.BASE_URL || 'http://localhost:6103';
const apiVersion = process.env.API_VERSION || '/api/v1';

export const api = async <T>(
    endpoint: string | URL,
    init?: RequestInit | undefined,
): Promise<TResponse<T>> => {
    const token = await GetAccessToken() || 'null';

    const res = await fetch(`${baseUrl}${apiVersion}${endpoint}`, {
        headers: {
            ...init?.headers,
            'Authorization': `Bearer ${token}`,
        },
        method: init?.method,
        body: init?.body,
        next: { tags: init?.next?.tags },
        credentials: 'include',
    });

    if (res.ok) return { data: await res.json() };
    return { error: await res.json() };
};