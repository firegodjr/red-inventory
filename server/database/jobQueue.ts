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
            let qjob = job.data as QueueableJob;
            
            return Jobs.Run(qjob).then((result) => {
                console.log("Job completed successfully");
                // TODO broadcast to all clients
                return result;
            }).catch((error) => {
                console.error("Job failed with error: " + error);
                throw error;
            });
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