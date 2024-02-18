import { Inventory, PrismaClient } from "@prisma/client";
import { GetUserFromRequest } from "../authUtil";
import DbQueue from "../database/jobQueue";
import { JobType, Jobs } from "../database/dbJobs";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    let { name } = await readBody(event);
    let user = GetUserFromRequest(event);
    let selectedCrewId = user?.selectedCrewId;

    if(selectedCrewId) {
        let param: Jobs.CreateParams<Inventory> = {
            newObj: {
                crewId: selectedCrewId,
                name: name,
                id: ""
            }
        }

        await DbQueue.GetInstance().Add({
            jobType: JobType.CREATE_INVENTORY,
            param: param
        });
    }
    else {
        throw createError("User must select a crew");
    }
});