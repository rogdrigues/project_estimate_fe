import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { string } from 'zod';
import { customFetch } from './lib';
import { UserMaster } from './types';
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log('token', token);
    if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    //@ts-ignore
    if (Date.now() > token.accessTokenExpiresAt) {
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
                    token.refresh_token = result.refresh_token || token.refresh_token;
                }

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
            } else {
                return NextResponse.redirect(new URL('/auth/signin', req.url));
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        }
    }

    //@ts-ignore
    const role = string().parse(token?.user.role.roleName).toLowerCase();
    if (role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/protected-page/:path*'],
};
