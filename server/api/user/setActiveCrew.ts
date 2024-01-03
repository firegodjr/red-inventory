import { PrismaClient } from "@prisma/client";
import { GetUserFromRequest } from "~/server/authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let { crewId } = await readBody(event);
    let user = GetUserFromRequest(event);
    if(user) {
        user.selectedCrewId = crewId;
        prisma.user.update({
            data: user,
            where: {
                id: user.id
            }
        })
    }
});