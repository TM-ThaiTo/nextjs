import NextAuth from "next-auth";
import { authOptions } from '@/session/auth-setting'
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
