import { Crew, Inventory, User } from "@prisma/client";
import Queue from "bull";
import { PrismaClient } from "@prisma/client";
import { DbUtil } from "./dbController";
import { JobType, Jobs, QueueableJob } from "./dbJobs";
const prisma = new PrismaClient();

/**
 * Queue manager that ensures no db operations overlap and we have a consistent series of events
 */
export default class DbQueue {
    public static _instance: DbQueue;
    private queue: Queue.Queue;

    private constructor() {
        const queue = Queue('db operations');

        this.queue = queue;

        this.queue.on('completed', (job, results) => {
            console.log('queue completed a job');
        });

        this.queue.on('error', async (error) => {
            console.error('queue error', error.message);
        });

        this.queue.on('failed', async (job, error) => {
            console.error('queue error', error.message);
        });

        this.queue.process((job) => {
            console.log("Processing job " + job.id);
            let data = job.data as QueueableJob;
            
            switch(data.jobType) {
                case JobType.CREATE_INVENTORY:
                    return Jobs.CreateInventory(data.param)
                case JobType.UPDATE_INVENTORY:
                    return Jobs.UpdateInventory(data.param)
                case JobType.DELETE_INVENTORY:
                    return Jobs.DeleteInventory(data.param)
                case JobType.CREATE_CREW:
                    return Jobs.CreateCrew(data.param)
                case JobType.UPDATE_CREW:
                    return Jobs.UpdateCrew(data.param)
                case JobType.DELETE_CREW:
                    return Jobs.DeleteCrew(data.param)
                case JobType.CREATE_ITEM:
                    return Jobs.CreateItem(data.param)
                case JobType.UPDATE_ITEM:
                    return Jobs.UpdateItem(data.param)
                case JobType.MOVE_ITEM:
                    //return Jobs.MoveItem(data.param)
                case JobType.CHECKOUT_ITEM:
                    //return Jobs.CheckoutItem(data.param)
                case JobType.DELETE_ITEM:
                    return Jobs.DeleteItem(data.param)
                case JobType.CREATE_FIELD:
                    return Jobs.CreateField(data.param)
                case JobType.UPDATE_FIELD:
                    return Jobs.UpdateField(data.param)
                case JobType.DELETE_FIELD:
                    return Jobs.DeleteField(data.param)
            }
        });
    }

    public static GetInstance() {
        if(!this._instance) {
            this._instance = new DbQueue();
        }

        return this._instance;
    }

    public async Add(job: QueueableJob) {
        this.queue.add(job);
    }
}