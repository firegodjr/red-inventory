import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    //let { email } = await readBody(event);

    async function writeUserToDb() {
        await prisma.user.create({
            data: {
                email: "test@user.com",
            }
        })
    }
    
    await writeUserToDb()
        .finally(async () => {
            await prisma.$disconnect();
        })
});