import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        users: {
            id: number;
            email: string;
            name: string;
            slug: string;
            avatar: string;
        };

        backendTokens: {
            accessToken: string;
        };
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number;
            email: string;
            name: string;
            slug: string;
            avatar: string;
        };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
