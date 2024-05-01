import type { Inventory } from '@prisma/client';
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore({
    id: 'inventory',
    state: () => ({
        inventories: [] as Inventory[],
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
        }
    }
});
