'use server';

import { IFollow, UResponseProfile } from "@/components/user/types";
import { api } from "@/utils/api";
import { ILikePost } from "@/types/user";
import { IBackendResSuccess } from "@/utils/lib.types";
import { revalidateTag } from "next/cache";

const getProfileUser = async (slug: string) => {
    const url = `/user/profile/${slug}`;
    return await api<any>(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}

const action_MyProfile = async (slug: string) => {
    const { data, error } = await api<UResponseProfile>(`/user/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return { data, error };
}

// action: get profile khách
const action_MyProfileGuest = async (slug: string) => {
    const { data, error } = await api(`/user/guest/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return { data, error };
}

const action_AddFollow = async (follow: IFollow) => {
    const { data, error } = await api<IBackendResSuccess>(`/follows/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(follow)
    });
    if (data) revalidateTag('get-suggest');
    return { data, error };
}

const action_UnFollow = async (follow: IFollow) => {
    const { data, error } = await api<IBackendResSuccess>(`/follows/unfollow`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(follow)
    });
    if (data) revalidateTag('get-suggest');
    return { data, error };
}

const action_AddLike = async (input: ILikePost) => {
    const { data, error } = await api<IBackendResSuccess>(`/like-post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
    });
    return { data, error };
}

const action_UnLike = async (input: ILikePost) => {
    const { data, error } = await api<IBackendResSuccess>(`/like-post`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
    });
    return { data, error };
}

const action_dataMyUser = async () => {
    const { data, error } = await api<any>(`/user/one`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        next: { tags: ['get-user'] }
    });
    return { data, error };
}

const updateProfile = async (formData: any) => {
    const { data, error } = await api<any>(`/user/p-update`, {
        method: 'PUT',
        body: formData,
    })
    return { data, error };
}

const updateTheme = async () => {
    const { data, error } = await api<any>(`/user/update/theme`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
    })
    return { data, error };
}
const updateLanguge = async (language: string) => {
    const { data, error } = await api<any>(`/user/update/language`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ language })
    })
    return { data, error };
}
const updatePrivacy = async () => {
    const { data, error } = await api<any>(`/user/update/privacy`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
    })
    return { data, error };
}

const getSuggestedUser = async () => {
    const { data, error } = await api<any>(`/user/suggested`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        next: {
            tags: ['get-suggest']
        }
    })
    return { data, error };
}
export {
    getProfileUser,
    action_MyProfile,
    action_MyProfileGuest,
    action_AddFollow,
    action_UnFollow,
    action_AddLike,
    action_UnLike,
    action_dataMyUser,
    updateProfile,
    updateTheme, updateLanguge, updatePrivacy,
    getSuggestedUser
}