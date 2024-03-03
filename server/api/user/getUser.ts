import { PrismaClient, User } from "@prisma/client";
import { AuthUtil } from "~/server/authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    var user = await AuthUtil.GetUserFromRequest(event);
    if(user) {
        return toUserDTO(user);
    }
})

function toUserDTO(user: User): any {
    return { id: user.id, email: user.email, username: user.username, selectedCrewId: user.selectedCrewId }
}