import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const SESSION_COOKIE = "SESH";

export function GetUserFromRequest(event: any): User | null {
    return event?.context?.user as User;
}

export function Hash(s: string) {
    return s;
}