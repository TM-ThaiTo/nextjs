'use server';

import { IPermission, RPermission, RPermissionNoGroup, R2M } from "@/types/dashboard"
import { api } from "@/utils/api"
import { revalidateTag } from "next/cache"
import queryString from "query-string";

const getPermissionsAction = async () => {
    return await api<RPermission>('/permission', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: {
            tags: ['load-permission']
        }
    })
}
const getPermissionWithDashboardAction = async () => {
    return await api<RPermission>('/permission/module/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
}

const getModulesAndMethodsNameAction = async () => {
    return await api<R2M>('/permission/2m', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
}
const getPermissionsNoGroupAction = async (page: number, limit: number) => {
    return await api<RPermissionNoGroup>(`/permission/all?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: {
            tags: ['load-permission-no-group']
        }
    })
}
const getPermissionByIdAction = async (id: string) => {
    return await api<IPermission>(`/permission/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
}
const getSearchPermissionAction = async (search: string, method: string, module: string, page: number, limit: number) => {
    const query = queryString.stringify({ search, method, module, page, limit, });
    const { data, error } = await api<RPermissionNoGroup>(`/permission/search?${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
    return { data, error }
}

const postCreatePermissionAction = async (dataCreate: any) => {
    const { data, error } = await api('/permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify(dataCreate),
    })
    revalidateTag('load-permission-no-group')
    return { data, error }
}
const putUpdatePermissionAction = async (id: string, dataUpdate: any) => {
    const { data, error } = await api(`/permission/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify(dataUpdate),
    })
    if (data) {
        revalidateTag('load-permission-no-group')
    }
    return { data, error }
}
const deletePermissionAction = async (id: string) => {
    const { data, error } = await api(`/permission/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
    })
    revalidateTag('load-permission-no-group')
    return { data, error }
}
const reloadPermissionAction = async () => {
    revalidateTag('load-permission-no-group')
}
export {
    getPermissionsAction, getPermissionWithDashboardAction,
    getPermissionsNoGroupAction,
    getPermissionByIdAction,
    getModulesAndMethodsNameAction,
    getSearchPermissionAction,
    postCreatePermissionAction,
    deletePermissionAction,
    putUpdatePermissionAction,
    reloadPermissionAction
}