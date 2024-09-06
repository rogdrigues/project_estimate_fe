
import { NextAuthOptions } from 'next-auth';

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
                        useCredentials: true,
                    });
                    if (response.EC === 0 && response.data) {
                        const { result, metadata } = response.data;

                        return {
                            access_token: result.access_token,
                            accessTokenExpiresAt: result.access_token_expires_at,
                            refresh_token: result.refresh_token,
                            ...metadata,
                        };
                    } else {
                        throw new Error(response.message || 'Login failed');
                    }
                } catch (error: any) {
                    console.error('Authorize error:', error.message);
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
                token.refresh_token = user.refresh_token;
                token.accessTokenExpiresAt = user.accessTokenExpiresAt;
                token.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    lastLogin: user.lastLogin,
                };
                token.error = '';
            }

            if (token.accessTokenExpiresAt && Date.now() > token.accessTokenExpiresAt - 14.5 * 60 * 1000) {
                try {
                    const refreshedTokens = await customFetch<UserMaster>({
                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/refresh-token`,
                        headers: {
                            'Cookie': `${token.refresh_token}`,
                        },
                        method: 'POST',
                        useCredentials: true
                    });

                    if (refreshedTokens.EC === 0) {
                        const { result, metadata } = refreshedTokens.data;
                        if (result.refresh_token) {
                            //Get 5 characters from the end of the refresh token
                            token.refresh_token = result.refresh_token;
                        }
                        console.log('Before access token:', token.access_token.slice(-5));
                        token.access_token = result.access_token;
                        console.log('After access token:', token.access_token.slice(-5));

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
                    }
                } catch (error: any) {
                    console.error("Error refreshing access token:", error.message);
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
        signIn: '/auth/signin',
    },
    events: {
        async signOut() {
            //Remove refresh token cookie
            //cookies().set('refreshToken', '', { maxAge: 0, path: '/' });
            //Remove session data
            return Promise.resolve();
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
};