// login value
export type LoginDataType = {
    email: string;
    password: string;
}

// register value
export type RegisterDataType = {
    email: string;
    password: string;
    userName: string;
    fullName: string;
    phone: string;
    address: string;
}

// response login
export type ResponseLogin = {
    code: number;
    message: string;
    access_token: string;
    refresh_token: string;
    user: UserTypeLogin
}

export type IChangePassword = {
    email: string;
    password: string;
    code: string;
}

type UserTypeLogin = {
    slug: string;
    id: string;
}

export type ResponseRegister = {
    code: number;
    message: string;
    data: any;
}