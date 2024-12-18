'use server';

import { RCustomer, RICustomer } from "@/types/dashboard";
import { api } from "@/utils/api";
import { revalidateTag } from "next/cache";
import queryString from "query-string";

const getSearchCustomerActions = async (
    search: string,
    follower: string,
    following: string,
    post: string,
    report: string,
    page: number,
    limit: number,
) => {
    const query = queryString.stringify({ search, follower, following, post, report, page, limit });
    const url = `/user/search?${query}`;
    const { data, error } = await api<RCustomer>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['get-search-customer'] }
    })
    return { data, error }
}

const getAllCustomerAction = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/user/all?${query}`
    const { data, error } = await api<RCustomer>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['get-customer'] }
    })
    return { data, error }
}

const getCustomerById = async (id: string) => {
    const url = `/user/one/${id}`
    const { data, error } = await api<RICustomer>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
    return { data, error }
}

const putUpdateCustomer = async (dataUp: any) => {
    const url = '/user/update'
    const { data, error } = await api<any>(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify(dataUp),
    })
    if (data) revalidateTag('get-customer');
    return { data, error }
}

export {
    getAllCustomerAction,
    getSearchCustomerActions,
    getCustomerById,
    putUpdateCustomer
}