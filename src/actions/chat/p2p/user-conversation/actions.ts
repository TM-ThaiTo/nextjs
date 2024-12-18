'use server'

import { api } from "@/utils/api"
import { revalidateTag } from "next/cache"

const updateDisplayName = async (dataUp: any) => {
    const url = `/user-conversation`
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataUp),
    })
    if (data) {
        revalidateTag('get-conversation');
        revalidateTag('get-group');
    }
    return { data, error };
}

const leaveGroup = async (dataUp: any) => {
    const url = `/user-conversation/leave`
    const { data, error } = await api<any>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataUp),
    })
    if (data) {
        revalidateTag('get-conversation');
        revalidateTag('get-group');
    }
    return { data, error };
}

export {
    updateDisplayName,
    leaveGroup
}