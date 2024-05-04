import type { MarkItemHeldDto } from '@/dto';
import type { Inventory, Item } from '@prisma/client';
import { defineStore } from 'pinia';

export type FullInventory = Inventory & { items: Item[] };

export const useInventoryStore = defineStore({
    id: 'inventory',
    state: () => ({
        inventories: [] as FullInventory[],
        loading: false
    }),
    actions: {
        async fetchInventories() {
            this.inventories = [];
            this.loading = true;
            try {
                this.inventories = await fetch('/api/user/getInventoriesForSelectedCrew', {
                    credentials: 'include'
                })
                    .then((response) => response.json())
                    .finally(() => {
                        this.loading = false;
                    });
            } catch (err: any) {}
        },

        async holdItem(itemId: string, userId: string | null) {
            for (let i = 0; i < this.inventories.length; ++i) {
                for (let j = 0; j < this.inventories[i].items.length; ++j) {
                    let item = this.inventories[i].items[j];
                    if (item.id === itemId) {
                        this.inventories[i].items[j].heldById = userId;
                    }
                }
            }

            let body: MarkItemHeldDto = {
                id: itemId,
                userId: userId
            };
            await fetch('/api/items/markItemHeld', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
        }
    }
});
