import { PrismaClient } from "@prisma/client";
import { AuthUtil } from "../authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let { email, username, password } = await readBody(event);

    let result = await prisma.user.create({
        data: {
            email,
            username,
            pwdhash: AuthUtil.Hash(password)
        }
    });
});