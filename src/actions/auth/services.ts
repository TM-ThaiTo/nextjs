import { api } from "@/utils/api"
import { RegisterDataType, ResponseRegister, IChangePassword } from '@/types/auth'
import { IBackendResSuccess } from '@/utils/lib.types';

export const RegisterResponseFetch = async (dataRegister: RegisterDataType) => {
    return await api<ResponseRegister>('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataRegister),
    })
}

export const RetryCodeVerify = async (email: string) => {
    return await api<ResponseRegister>('/auth/retry-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
    })
}

export const VerityAccount = async (values: any) => {
    return await api<IBackendResSuccess>(`/auth/check-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    })
}

export const RetryCodeForgot = async (email: string) => {
    return await api<ResponseRegister>(`/auth/retry-code-forgotpassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email })
    })
}

export const ChangePassword = async (data: IChangePassword) => {
    return await api<ResponseRegister>(`/auth/forgot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

export const LogoutSerive = async () => {
    return await api<IBackendResSuccess>('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
}