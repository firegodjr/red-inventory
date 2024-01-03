import { PrismaClient } from "@prisma/client";
import { GetUserFromRequest } from "~/server/authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let user = GetUserFromRequest(event);

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