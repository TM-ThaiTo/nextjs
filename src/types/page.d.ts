export type PageDashboard = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export type PageIdAndQuery = {
    params: {
        id: string;
    },
    searchParams: { [key: string]: string | string[] | undefined }
};