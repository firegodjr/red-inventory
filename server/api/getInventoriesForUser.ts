import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    let { userId } = await readBody(event);

    return prisma.inventory.findMany({
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
            _count: true,
            items: {
                
                include: {
                    fields: true,
                }
            },
            users: true
        }
    })
});