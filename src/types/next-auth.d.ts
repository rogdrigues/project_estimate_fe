// types/next-auth.d.ts

import NextAuth from "next-auth";
import { UserMaster } from "./UserMaster";

declare module "next-auth" {
    interface User extends UserMaster {
        access_token: string;
        accessTokenExpiresAt: number;
    }
    interface Session {
        access_token: string;
        refresh_token: string;
        user: UserMaster;
        access_expire: number;
        error: string;
    }

    interface JWT {
        access_token: string;
        refresh_token: string;
        user: UserMaster;
        access_expire: number;
        error: string;
    }
}
