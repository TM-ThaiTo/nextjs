'use server'

import { RAccount, RIAccount } from "@/types/dashboard"
import { api } from "@/utils/api"
import { revalidateTag } from "next/cache";
import queryString from "query-string";


const getSearchAccountAction = async (
    search: string,
    type: string,
    roleName: string,
    page: number,
    limit: number,
) => {
    const query = queryString.stringify({ search, type, roleName, page, limit });
    const urlGet = `/account/search?${query}`;
    const { data, error } = await api<RAccount>(urlGet, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })

    return { data, error }
}
const getAllAccountAction = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const urlGet = `/account/all?${query}`;
    const { data, error } = await api<RAccount>(urlGet, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        next: {
            tags: ['get-account']
        }
    })
    return { data, error }
}
const getAccountById = async (id: string) => {
    const { data, error } = await api<RIAccount>(`/account/item/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
    return { data, error };
}
const postCreateAccountAction = async (dataCreate: any) => {
    const { data, error } = await api<RAccount>('/account/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dataCreate),
    })
    if (data) {
        revalidateTag('get-account');
        revalidateTag('get-customer');
    }
    return { data, error }
}
const deleteAccountActions = async (id: string) => {
    const { data, error } = await api<RAccount>(`/account/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    if (data) revalidateTag('get-account');
    return { data, error }
}
const putUpdateAccountActions = async (id: string, dataUpdate: any) => {
    const { data, error } = await api<RAccount>(`/account/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dataUpdate)
    })
    if (data) revalidateTag('get-account');
    return { data, error }
}
export {
    getAllAccountAction,
    getSearchAccountAction,
    getAccountById,
    postCreateAccountAction,
    deleteAccountActions,
    putUpdateAccountActions
}