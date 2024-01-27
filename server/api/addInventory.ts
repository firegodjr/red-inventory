import { PrismaClient } from "@prisma/client";
import { GetUserFromRequest } from "../authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    //let { email } = await readBody(event);

    let user = GetUserFromRequest(event);
    let { crew: string } = await readBody(event);

    
});