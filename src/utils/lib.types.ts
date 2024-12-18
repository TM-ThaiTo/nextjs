export type TResponse<T> = {
    data?: T;
    error?: { error: string; message: string; statusCode: number };
};

export type TParams = {
    params: {
        slug: string;
    };
};

export type ProfileParams = {
    params: {
        children: React.ReactNode,
        slug: string,
    }
}

export type PostParams = {
    params: {
        children: React.ReactNode,
        slug: string,
    }
}

export type LayoutPage = {
    children: React.ReactNode,
    slug?: string,
}

export type IBackendResSuccess = {
    code: number;
    message: string;
}