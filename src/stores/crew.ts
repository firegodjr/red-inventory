import type { Crew } from '@prisma/client';
import { defineStore } from 'pinia';

export const useCrewStore = defineStore({
    id: 'crews',
    state: () => ({
        Crews: [] as Crew[]
    }),
    actions: {
        async fetchCrews() {
            await fetch('/api/user/getCrews', {
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    this.Crews = json;
                });
        }
    }
})

