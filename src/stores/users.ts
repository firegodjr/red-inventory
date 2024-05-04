import { defineStore } from 'pinia';
import { toUserDto, type UserDto } from '@/dto';

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {} as Dictionary<UserDto>
    }),
    actions: {
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
        }
    }
});

interface Dictionary<T> {
    [key: string]: T;
}
