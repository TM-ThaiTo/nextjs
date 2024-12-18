'use server'

import { api } from "@/utils/api"
import { revalidateTag } from "next/cache"
import queryString from "query-string"

const getAllCommentByIdPost = async (id: string, page: number, limit: number) => {
    const query = queryString.stringify({ page, limit })
    const url = `/comment/admin/all/${id}?${query}`
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        next: {
            tags: ['get-comment']
        }
    })
    return { data, error };
}

const searchCommentByIdPost = async (id: string, page: number, limit: number, search: string, idUser: string, idComment: string) => {
    const query = queryString.stringify({ page, limit, search, idUser, idComment })
    const url = `/comment/admin/search/${id}?${query}`
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return { data, error };
}

const createCommentByIdPost = async (body: any) => {
    const url = `/comment/admin/create`
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
    })
    if (data) revalidateTag('get-comment')
    return { data, error };
}

const deleteCommentByIdPost = async (id: string) => {
    const url = `/comment/admin/delete/${id}`
    const { data, error } = await api<any>(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    if (data) revalidateTag('get-comment')
    return { data, error };
}

export {
    getAllCommentByIdPost,
    searchCommentByIdPost,
    createCommentByIdPost,
    deleteCommentByIdPost
}