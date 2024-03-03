import { PrismaClient } from "@prisma/client";
import { AuthUtil } from "~/server/authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let user = AuthUtil.GetUserFromRequest(event);

    let crew = prisma.crew.findMany({
        where: {
            users: {
                some: {
                    id: user?.id
                }
            }
        }
    });

    return crew;
});