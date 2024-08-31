import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { string } from 'zod';
import { cookies } from 'next/headers';
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
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
