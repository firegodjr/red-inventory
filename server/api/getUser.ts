import { PrismaClient, User } from "@prisma/client";
import { GetUserFromRequest } from "../authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    var user = GetUserFromRequest(event);

    return { username: user?.username };
})