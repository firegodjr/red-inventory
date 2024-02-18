import { Inventory, PrismaClient } from "@prisma/client";
import * as AuthUtil from "../authUtil";
import { ItemQuality, ItemType } from "~/items/itemsUtil";

export class DbUtil {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async createUser(email: string, username: string, pwd: string) {
        let result = await this.prisma.user.create({
            data: {
                email,
                username,
                pwdhash: AuthUtil.Hash(pwd),
            }
        });
        return result;
    }

    public async updateUser() {
        //TODO
    }

    public async deleteUser(userId: string,) {
        let result = await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
    }

    public async createCrew(name: string) {
        let result = await this.prisma.crew.create({
            data: {
                name
            }
        });
        return result;
    }

    public async updateCrew() {
        // TODO
    }

    public async deleteCrew(crewId: string) {
        let result = await this.prisma.crew.delete({
            where: {
                id: crewId
            }
        });
        return result;
    }

    public async createItem(inventoryId: string, name: string, type: ItemType, quality: ItemQuality, count: number, fields: { name: string, value: string }[]) {
        let result = await this.prisma.item.create({
            data: {
                inventoryId,
                name,
                type,
                quality,
                count,
                fields: {
                    create: fields
                }
            }
        });
        return result;
    }

    public async moveItem(oldInvId: string, newInvId: string, itemId: string) {
        let result = await this.prisma.item.update({
            where: {
                id: itemId,
                inventoryId: oldInvId
            },
            data: {
                inventoryId: newInvId
            }
        });
        return result;
    }

    public async updateItem() {
        //TODO
    }

    public async deleteItem(itemId: string) {
        let result = await this.prisma.item.delete({
            where: {
                id: itemId
            }
        });
        return result;
    }
}