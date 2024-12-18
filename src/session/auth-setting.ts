import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';
import { JWT } from "next-auth/jwt";

const baseUrl = process.env.BASE_URL || 'http://localhost:6103';
const apiVersion = process.env.API_VERSION || '/api/v1';
const endpoint = `${baseUrl}${apiVersion}`;

export async function refreshToken(token: JWT): Promise<JWT> {
    const refreshToken = token?.backendTokens?.refreshToken;
    if (!refreshToken) throw new Error("No refresh token available");
    const res = await fetch(endpoint + "/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ refreshToken })
    });
    if (!res.ok) throw new Error("Failed to refresh token");
    const response = await res.json();
    return { ...token, backendTokens: response, };
}

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.username || !credentials?.password) return null;
                    const res = await fetch(endpoint + "/auth/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials.username,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json", },
                    });
                    const user = await res.json();
                    console.log('check user: ', user);
                    if (!res.ok && user) return { code: user?.code, error: user?.message || "Login failed" };
                    return user;

                } catch (error) { return { error: true, message: error, }; }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, profile, account }) {
            if (account && account.provider === "google") {
                // Fetch access and refresh tokens from your backend
                const res = await fetch(`${endpoint}/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: user?.email,
                        name: user?.name,
                        image: user?.image,
                        provider: account?.provider,
                        tokenId: account?.id_token,
                    }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error("Failed to fetch tokens from backend");
                token.user = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.name,
                    slug: data.user.slug,
                    avatar: data.user.avatar,
                };
                token.backendTokens = {
                    accessToken: data.backendTokens.accessToken,
                    refreshToken: data.backendTokens.refreshToken,
                    expiresIn: data.backendTokens.expiresIn,
                };
                return token;
            }
            if (user) return { ...token, ...user };
            if (new Date().getTime() < token?.backendTokens.expiresIn) {
                return token;
            }
            else if (new Date().getTime() > token?.backendTokens.expiresIn) {
                return await refreshToken(token);
            }
            return token;
        },

        async session({ token, session, user }) {
            if (session) {
                session.users = token.user;
                session.backendTokens = { accessToken: token.backendTokens.accessToken };
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") return true;

            if (user && (user as any).error) {
                const errorMessage = (user as any).error;
                const code = (user as any).code;
                throw new Error(`code:${code}|message:${errorMessage}`)
            }
            return true;
        },
        async redirect({ url, baseUrl }) { return baseUrl; },
    },
};

