import { getServerSession } from "next-auth";
import { authOptions } from "@/session";

export const GetAccessToken = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return 'null';
    return session?.backendTokens?.accessToken.toString();
}

export const GetInfoUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    return session?.users;
}