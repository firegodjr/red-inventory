import { PrismaClient } from "@prisma/client";
import { GetUserFromRequest } from "../authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    let user = GetUserFromRequest(event);
    let selectedCrewId = user?.selectedCrewId;
    let { name } = await readBody(event);

    if(selectedCrewId) {
        let result = await prisma.inventory.create({
            data: {
                name,
                crewId: selectedCrewId
            }
        });
        return result;
    }
    else {
        throw createError("User must select a crew");
    }
    
});