import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const SESSION_COOKIE = "SESH";

export namespace AuthUtil {
    export function GetUserFromRequest(event: any): User | null {
        return event?.context?.user as User;
    }

    export function GetTokenFromRequest(event: any): string | null {
        return event?.context?.userToken as string;
    }

    export function Hash(s: string) {
        return s;
    }

    export function GetSessionExpiry(minutes: number = 15): Date {
        return new Date(Date.now() + minutes*60*1000);
    }
}