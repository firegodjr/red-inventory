import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// TODO skip/take
export default defineEventHandler(async (event) => {
    let { userId } = await readBody(event);

    let result = await prisma.inventory.findMany({
        where: {
            users: {
                some: {
                    id: {
                        equals: userId
                    }
                }
            }
        },
        include: {
            items: {
                include: {
                    fields: true
                }
            },
            users: true
        }
    });

    return result.map(x => { 
        return {
            name: x.name,
            items: x.items,
            users: x.users,
            userCount: x.users.length,
            itemCount: x.items.length
        }
    });
});