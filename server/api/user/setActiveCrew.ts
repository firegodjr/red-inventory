import { PrismaClient } from "@prisma/client";
import { AuthUtil } from "~/server/authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let { crewId } = await readBody(event);
    let user = AuthUtil.GetUserFromRequest(event);
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