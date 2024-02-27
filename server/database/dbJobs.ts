import { Crew, Inventory, Item, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * A job that can be processed in a job queue.
 */
export interface QueueableJob {
    jobType: JobType
    param: any
}

export enum JobType {
    CREATE_INVENTORY,
    UPDATE_INVENTORY,
    DELETE_INVENTORY,
    CREATE_CREW,
    UPDATE_CREW,
    DELETE_CREW,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CREATE_FIELD,
    UPDATE_FIELD,
    DELETE_FIELD
}

/**
 * Contains function implementations to be executed in a job queue 
 * and broadcast as an update to all connected clients.
 */
export namespace Jobs {

    /**
     * Run the appropriate job function based on the job type.
     * @param job The job to run.
     */
    export function Run(job: QueueableJob): Promise<any> {
        switch(job.jobType) {
            case JobType.CREATE_INVENTORY:
                return CreateInventory(job.param)
            case JobType.UPDATE_INVENTORY:
                return UpdateInventory(job.param)
            case JobType.DELETE_INVENTORY:
                return DeleteInventory(job.param)
            case JobType.CREATE_CREW:
                return CreateCrew(job.param)
            case JobType.UPDATE_CREW:
                return UpdateCrew(job.param)
            case JobType.DELETE_CREW:
                return DeleteCrew(job.param)
            case JobType.CREATE_ITEM:
                return CreateItem(job.param)
            case JobType.UPDATE_ITEM:
                return UpdateItem(job.param)
            case JobType.DELETE_ITEM:
                return DeleteItem(job.param)
            case JobType.CREATE_FIELD:
                return CreateField(job.param)
            case JobType.UPDATE_FIELD:
                return UpdateField(job.param)
            case JobType.DELETE_FIELD:
                return DeleteField(job.param)
        }
    }

    export interface CreateParams<T> {
        newObj: T
    }

    export interface UpdateParams<T> {
        updatedObj: T
    }

    export interface DeleteParams {
        id: string
    }

    export function CreateInventory(param: CreateParams<Inventory>) {
        return prisma.inventory.create({
            data: param.newObj
        });
    }

    export function UpdateInventory(param: UpdateParams<Inventory>) {
        return prisma.inventory.update({
            where: {
                id: param.updatedObj.id
            },
            data: param.updatedObj
        })
    }

    export function DeleteInventory(param: DeleteParams) {
        return prisma.inventory.delete({
            where: {
                id: param.id
            }
        })
    }

    export function CreateCrew(param: CreateParams<Crew>) {
        return prisma.crew.create({
            data: param.newObj
        });
    }

    export function UpdateCrew(param: UpdateParams<Crew>) {
        return prisma.crew.update({
            where: {
                id: param.updatedObj.id
            },
            data: param.updatedObj
        })
    }

    export function DeleteCrew(param: DeleteParams) {
        return prisma.crew.delete({
            where: {
                id: param.id
            }
        })
    }

    export function CreateItem(param: CreateParams<Item>) {
        return prisma.item.create({
            data: param.newObj
        });
    }

    export function UpdateItem(param: UpdateParams<Item>) {
        return prisma.item.update({
            where: {
                id: param.updatedObj.id
            },
            data: param.updatedObj
        })
    }

    export function DeleteItem(param: DeleteParams) {
        return prisma.item.delete({
            where: {
                id: param.id
            }
        })
    }

    export function CreateField(param: CreateParams<Item>) {
        return prisma.item.create({
            data: param.newObj
        });
    }

    export function UpdateField(param: UpdateParams<Item>) {
        return prisma.item.update({
            where: {
                id: param.updatedObj.id
            },
            data: param.updatedObj
        })
    }

    export function DeleteField(param: DeleteParams) {
        return prisma.item.delete({
            where: {
                id: param.id
            }
        })
    }
}