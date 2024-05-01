import type { UserDto } from '@/dto';
import { defineStore } from 'pinia';

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
        }
    }
});
