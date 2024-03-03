import { PrismaClient, User } from "@prisma/client";
import { AuthUtil } from "~/server/authUtil";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let token = AuthUtil.GetTokenFromRequest(event);
    if(token) {
        // Delete the session token from the server
        await prisma.session.deleteMany({
            where: {
                token: token
            },
        });
    }
});