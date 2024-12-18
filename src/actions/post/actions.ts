'use server'
import { RequestCreatePost, Response_GetMyPost, IOnePost } from "@/types/post";
import { revalidateTag } from "next/cache";
import { api } from "@/utils/api";
import queryString from "query-string";
import { IBackendResSuccess } from "@/utils/lib.types";

const endpoint_post = '/post';
const action_MyPost = async (slug: string, page: number = 1, limit: number = 2) => {
    const { error, data } = await api<Response_GetMyPost>(`${endpoint_post}/user/${slug}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    return { data, error }
}
const action_createPost = async (value: RequestCreatePost) => {
    const { data, error } = await api(`${endpoint_post}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(value),
    });
    return { data, error }
}
const action_GetDetailPostBySlug = async (slug: string) => {
    const { error, data } = await api<IOnePost>(`${endpoint_post}/${slug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return { data, error }
}
const action_GetDetailPostBySlugPublic = async (slug: string) => {
    const { error, data } = await api<IOnePost>(`${endpoint_post}/${slug}/no-auth`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return { data, error }
}

const action_GetPostPublic = async (slug: string) => {
    const { data, error } = await api<Response_GetMyPost>(`${endpoint_post}/user-public/${slug}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    return { data, error }
}

const action_HandleLikePost = async (slug: string) => {
    const { data, error } = await api<IBackendResSuccess>('/post/update/like', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ slug })
    })

    if (data) revalidateTag('load-home-post')
    return { data, error };
}
const action_HandleCommentPost = async (slug: string) => {
    revalidateTag('load-home-post')
    return await api<IBackendResSuccess>('/post/update/comment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ slug })
    })
}

const action_HandlePublicPost = async (slug: string) => {
    revalidateTag('load-home-post')
    return await api<IBackendResSuccess>('/post/update/public', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ slug })
    })
}
const action_DeletePost = async (id: string) => {
    return await api<IBackendResSuccess>('/post/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id })
    })
}

const createPostStatus = async (dataC: any) => {
    const url = `/post/create`;
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify(dataC),
    })
    return { data, error }
}

const action_GetPostHome = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `${endpoint_post}/home?${query}`;
    const { data, error } = await api<Response_GetMyPost>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['load-home-post'] }
    })
    return { data, error }
}

const action_createPostVideo = async (formData: any) => {
    const url = `/post/create/video`;
    const { data, error } = await api(url, {
        method: 'POST',
        body: formData,
    });
    return { data, error }
}
const action_createPostImage = async (formData: any) => {
    const url = `/post/create/image`;
    const { data, error } = await api(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    return { data, error }
}

const action_getReels = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/post/video/reels?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return { data, error };
}

const action_getExplore = async (page: number, limit: number) => {
    const query = queryString.stringify({ page, limit });
    const url = `/post/media/explore?${query}`;
    const { data, error } = await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return { data, error };
}
export {
    createPostStatus,
    action_GetPostHome,
    action_MyPost,
    action_createPost,
    action_GetDetailPostBySlug,
    action_GetDetailPostBySlugPublic,
    action_GetPostPublic,
    action_HandleLikePost,
    action_HandleCommentPost,
    action_HandlePublicPost,
    action_DeletePost,
    action_createPostVideo,
    action_createPostImage,
    action_getReels,
    action_getExplore
}