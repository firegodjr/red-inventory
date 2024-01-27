import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function canUserAccessCrew(userGuid: string, crewGuid: string): boolean {
    let crew = await prisma.crew.findFirst({
        where: {
            guid: crewGuid,
            users: {
                some: {
                    id: userGuid
                }
            }
        }
    })
}