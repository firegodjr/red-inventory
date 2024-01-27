import { PrismaClient } from "@prisma/client";
import { GetUserFromRequest } from "~/server/authUtil";
const prisma = new PrismaClient();


// TODO skip/take
export default defineEventHandler(async (event) => {

    // TODO can logged in user access this crew?

    // Make sure they actually have a selected crew
    let user = GetUserFromRequest(event);
    
    if(user?.selectedCrewId == null) {
        throw createError({ statusCode: 404, statusMessage: "No crew selected!"})
    }

    let result = await prisma.inventory.findMany({
        where: {
            crew: {
                id: {
                    equals: event.context.user.selectedCrewId
                }
            }
        },
        include: {
            items: {
                include: {
                    fields: true
                }
            }
        }
    });

    return result.map(x => { 
        return {
            name: x.name,
            items: x.items,
            itemCount: x.items.length
        }
    });
});