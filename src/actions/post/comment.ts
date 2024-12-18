'use server'
import { AddCommentType } from "@/types/post";
import { api } from "@/utils/api";
import queryString from "query-string";
import { ResponseGetComment } from "@/types/comment";

const endpoint_comment = '/comment'

const action_GetCommentBySlugPost = async (slug: string, page: number = 1, limit: number = 5) => {
    const query = queryString.stringify({ page, limit });
    const url = `${endpoint_comment}/get/${slug}?${query}`;
    const { error, data } = await api<ResponseGetComment>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'force-cache',
        next: { tags: ['list-comment'] }
    })
    return { data, error }
}
const action_GetCommentBySlugPostPublic = async (slug: string, page: number = 0, limit: number = 1) => {
    const query = queryString.stringify({ page, limit });
    const url = `${endpoint_comment}/public/get/${slug}?${query}`;
    const { error, data } = await api<ResponseGetComment>(`${url}/public/get/${slug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return { data, error }
}
const action_GetCommentReplyByIdCommentParent = async (id: string) => {
    const { data, error } = await api<ResponseGetComment>(`${endpoint_comment}/comment-child/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'default',
        next: { tags: ['list-comment-child'] }
    })
    return { data, error }
}
const action_AddCommentPost = async (newComment: AddCommentType) => {
    const { data, error } = await api<any>(`${endpoint_comment}/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newComment)
    })
    return { data, error }
}
export {
    action_GetCommentBySlugPost,
    action_GetCommentBySlugPostPublic,
    action_GetCommentReplyByIdCommentParent,
    action_AddCommentPost,
}