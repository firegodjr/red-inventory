import type { Item, UserAuth, UserData } from '@prisma/client';

export interface LoginDto {
    username: string;
    password: string;
}

export interface SelectCrewDto {
    crewId: string;
}

export interface UserDto {
    icon: Blob;
    email: string;
    username: string;
    selectedCrewId: string | null;
    heldItems: Item[];
}

export function toUserDto(auth: UserAuth, user: UserData, heldItems: Item[]): UserDto {
    return {
        icon: new Blob(),
        email: auth.email,
        username: auth.username,
        selectedCrewId: user.selectedCrewId,
        heldItems: heldItems
    };
}
