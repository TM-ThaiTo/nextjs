'use server'
import { RegisterDataType, } from '@/types/auth'
import { RegisterResponseFetch, RetryCodeVerify, VerityAccount, LogoutSerive } from '@/actions/auth/services'

export const registerAction = async (body: RegisterDataType) => {
    return await RegisterResponseFetch(body);
}

export const retryAction = async (email: string) => {
    return await RetryCodeVerify(email);
}

export const activeRetryAction = async (id: string, code: string) => {
    return await VerityAccount({ _id: id, code: code });
}

export const logoutAction = async () => {
    return await LogoutSerive();
}