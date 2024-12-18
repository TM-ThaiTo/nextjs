'use server';

import { RRole, RRoleItem, RAction, RRoleName } from "@/types/dashboard"
import { api } from "@/utils/api"
import { revalidateTag } from "next/cache"
import queryString from "query-string";

const getDashboardAction = async () => {
    return await api<RAction>('/role/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
}

const getRoleNameAction = async () => {
    return await api<RRoleName>('/role/name', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
}

const getRoleByIdAction = async (id: string) => {
    return await api<RRoleItem>(`/role/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
}

const getRoleAction = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    return await api<RRole>(`/role?${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['get-role'] }
    })
}

const getSearchRoleAction = async (
    search: string = '',
    active: string,
    roleName: string,
    page: number,
    limit: number
) => {
    const query = queryString.stringify({ search, roleName, active, page, limit, });
    const endpoint = `/role/search/roles?${query}`;
    try {
        const { data, error } = await api<RRole>(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        return { data, error };
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

const putUpdateRoleAction = async (dataUpdate: any) => {
    const { data, error } = await api('/role', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dataUpdate)
    })
    revalidateTag('get-role');
    return { data, error }
}

const postCreateRoleAction = async (dataCreate: any) => {
    const { data, error } = await api('/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dataCreate)
    })
    revalidateTag('get-role');
    return { data, error }
}

const deleteRoleAction = async (id: string) => {
    const { data, error } = await api(`/role/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    revalidateTag('get-role');
    return { data, error }
}

export {
    getRoleNameAction,
    getDashboardAction,
    getRoleByIdAction,
    getRoleAction,
    getSearchRoleAction,
    putUpdateRoleAction,
    postCreateRoleAction,
    deleteRoleAction
}