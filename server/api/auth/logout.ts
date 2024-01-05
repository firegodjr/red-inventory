import { PrismaClient, User } from "@prisma/client";
import { GetTokenFromRequest, GetUserFromRequest } from "~/server/authUtil";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let token = GetTokenFromRequest(event);
    if(token) {
        // Delete the session token from the server
        await prisma.session.deleteMany({
            where: {
                token: token
            },
        });
    }
});