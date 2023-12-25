import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// TODO skip/take
export default defineEventHandler(async (event) => {
    let { id } = await readBody(event);

    // TODO can logged in user access this crew?

    let result = await prisma.inventory.findMany({
        where: {
            crew: {
                id: {
                    equals: id
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