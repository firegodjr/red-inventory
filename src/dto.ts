import type { User } from '@prisma/client';

export interface LoginDto {
    username: string;
    password: string;
}

export interface UserDto {
    icon: Blob;
    email: string;
    username: string;
}

export function toUserDto(user: User): UserDto {
    return {
        icon: new Blob(),
        email: user.email,
        username: user.username
    };
}
