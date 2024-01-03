import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    if(event.context.user) {
        prisma.session.deleteMany({
            where: {
                userId: event.context.user?.id
            }
        })
        //TODO remove user token from server
    }
});