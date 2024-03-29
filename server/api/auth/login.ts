import { PrismaClient, User } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import { AuthUtil, SESSION_COOKIE } from "../../authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let { username, password } = await readBody(event);

    // Check username and password hash
    let user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if(user?.pwdhash == AuthUtil.Hash(password)) {
        const uniqueToken = uuidv4();
        await prisma.session.create({
            data: {
                userId: user.id,
                token: uniqueToken,
                expiration: AuthUtil.GetSessionExpiry(3*24*60)
            }
        })

        return { token: uniqueToken, error: "" };
    }
    else {
        console.log("Failed to login");
        if(user) {
            return { token: "", error: "Password is incorrect" };
        }
        else {
            return { token: "", error: "Username not found" };
        }
    }
});