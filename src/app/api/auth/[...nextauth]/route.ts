import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { customFetch } from '@/lib/index';
import { UserMaster } from '@/types/index';
import { custom } from 'zod';

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
                        useCredentials: true,
                    });
                    if (response.EC === 0 && response.data) {
                        const { result, metadata } = response.data;
                        return {
                            access_token: result.access_token,
                            access_token_expires_at: result.access_token_expires_at,
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
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.access_token = user.access_token;
                token.accessTokenExpiresAt = user.access_token_expires_at;
                token.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    division: user.division,
                    department: user.department,
                    lastLogin: user.lastLogin,
                };
                token.error = '';
            }
            const now = Date.now();
            if (token.accessTokenExpiresAt && now > token.accessTokenExpiresAt - 5 * 60 * 1000) {
                console.log("Refreshing access token");
                try {
                    const refreshedTokens = await customFetch<UserMaster>({
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/refresh-token`,
                        method: 'POST',
                        useCredentials: true
                    });

                    if (refreshedTokens.EC === 0) {
                        const { result, metadata } = refreshedTokens.data;

                        token.access_token = result.access_token;
                        token.accessTokenExpiresAt = result.access_token_expires_at;
                        token.user = {
                            id: metadata.id,
                            username: metadata.username,
                            email: metadata.email,
                            role: metadata.role,
                            division: metadata.division,
                            department: metadata.department,
                            lastLogin: metadata.lastLogin,
                        };
                        token.error = '';

                    } else {
                        throw new Error("Failed to refresh access token");
                    }
                } catch (error) {
                    console.error("Error refreshing access token:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.access_token = token.access_token as string;
                session.user = token.user as UserMaster;
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
