import type { Crew } from '@prisma/client';
import { defineStore } from 'pinia';

export const useCrewStore = defineStore({
    id: 'crews',
    state: () => ({
        allCrews: [] as Crew[]
    })
});
