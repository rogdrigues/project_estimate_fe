import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { customFetch } from '@/lib/index';
import { UserMaster } from '@/types/index';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await customFetch<UserMaster>({
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
                        method: 'POST',
                        body: {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                    });
                    if (response.EC === 0 && response.data) {
                        const { result, metadata } = response.data;
                        return {
                            access_token: result.access_token,
                            refresh_token: result.refresh_token,
                            ...metadata,
                        };
                    } else {
                        throw new Error(response.message || 'Login failed');
                    }
                } catch (error) {
                    console.error('Authorize error:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
                token.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    division: user.division,
                    department: user.department,
                    profile: user.profile,
                    lastLogin: user.lastLogin,
                };
                token.access_expire = Date.now() + 15 * 60 * 1000;
                token.error = '';
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.access_token = token.access_token as string;
                session.refresh_token = token.refresh_token as string;
                session.user = token.user as UserMaster;
                session.access_expire = token.access_expire as number;
                session.error = token.error as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin'
    },
    secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth({
    ...authOptions
});

export { handler as GET, handler as POST };
