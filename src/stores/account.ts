import type { FriendDto, UserDto } from '@/dto';
import type { UserData } from '@prisma/client';
import { defineStore } from 'pinia';
import { useInventoryStore } from './inventory';

export const useAccountStore = defineStore({
    id: 'account',
    state: () => ({
        account: undefined as UserDto | undefined,
        loading: false
    }),
    actions: {
        async fetchUserData() {
            this.account = undefined;
            this.loading = true;
            try {
                this.account = await fetch('/api/user/getAccount', {
                    credentials: 'include'
                })
                    .then((response) => response.json())
                    .finally(() => {
                        this.loading = false;
                    });
            } catch (err: any) {}
        },

        async updateActiveCrew(crewId: string) {
            await fetch('/api/user/selectCrew', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    crewId: crewId
                })
            })
                .then((response) => {
                    if (response.ok) {
                        if (!this.account) {
                            return this.fetchUserData();
                        }
                    }
                })
                .then((response) => {
                    if (this.account) {
                        this.account.selectedCrewId = crewId;
                    }
                })
                .finally(() => {
                    // Update stores that depend on crew selection
                    const inventoryStore = useInventoryStore();
                    inventoryStore.fetchInventories();
                });
        }
    }
});
