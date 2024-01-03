import { PrismaClient, User } from "@prisma/client";
import { GetUserFromRequest } from "~/server/authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    var user = await GetUserFromRequest(event);
    if(user) {
        return toUserDTO(user);
    }
})

function toUserDTO(user: User): any {
    return { id: user.id, email: user.email, username: user.username, selectedCrewId: user.selectedCrewId }
}