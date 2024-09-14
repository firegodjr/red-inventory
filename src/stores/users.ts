import { defineStore } from 'pinia';
import { toUserDto, type UserDto } from '@/dto';
import type { Crew } from '@prisma/client';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {} as Dictionary<UserDto>,
        crews: {} as Crew[]
    }),
    actions: {
        async fetchCrews() {
            if (Object.keys(this.crews).length == 0) {
                await fetch('/api/user/getCrews', {
                    credentials: 'include'
                })
                    .then((response) => response.json())
                    .then((json: Crew[]) => {
                        this.crews = json;
                    });
            }

            return this.crews;
        },
        async getCrew(crewId: string) {
            if (Object.keys(this.crews).length == 0) {
                await this.fetchCrews();
            }

            return this.crews.filter(crew => crew.id == crewId)[0];
        },
        async fetchUser(userId: string) {
            if (!this.users[userId]) {
                return fetch(
                    '/api/user/getUser?' +
                    new URLSearchParams({
                        id: userId
                    }),
                    {
                        credentials: 'include'
                    }
                )
                    .then((res) => res.json())
                    .then((user: UserDto) => {
                        this.users[user.dataId] = user;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } else {
                return this.users[userId];
            }
        },
    }
});

async function post(endpoint: string, obj: object) {
    return await fetch('/api/user/' + endpoint, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(obj)
    })
}

interface Dictionary<T> {
    [key: string]: T;
}
