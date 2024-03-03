import { Inventory } from "@prisma/client";
import { AuthUtil } from "../authUtil";
import DbQueue from "../database/jobQueue";
import { JobType, Jobs } from "../database/dbJobs";

export default defineEventHandler(async (event) => {

    let { name } = await readBody(event);
    let user = AuthUtil.GetUserFromRequest(event);
    let selectedCrewId = user?.selectedCrewId;

    if(selectedCrewId) {
        await DbQueue.GetInstance().Add({
            jobType: JobType.CREATE_INVENTORY,
            param: <Jobs.CreateParams<Inventory>>{
                newObj: {
                    crewId: selectedCrewId,
                    name: name
                }
            }
        });
    }
    else {
        throw createError("User must select a crew");
    }
});