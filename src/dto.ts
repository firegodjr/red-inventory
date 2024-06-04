import type { Item, UserAuth, UserData, UserNotif } from '@prisma/client';

export interface LoginDto {
    username: string;
    password: string;
}

export interface SelectCrewDto {
    crewId: string;
}

export interface MarkItemHeldDto {
    id: string;
    userId: string | null;
}

export interface UserDto {
    dataId: string;
    icon: Blob;
    email: string;
    username: string;
    selectedCrewId: string | null;
    heldItems: Item[];
    notifs: UserNotif[];
}

export interface FriendDto {
    icon: Blob;
    username: string;
    heldItems: Item[];
}

export function toUserDto(
    auth: UserAuth,
    user: UserData,
    heldItems: Item[],
    notifs: UserNotif[]
): UserDto {
    return {
        dataId: user.id,
        icon: new Blob(),
        email: auth.email,
        username: auth.username,
        selectedCrewId: user.selectedCrewId,
        heldItems: heldItems,
        notifs: notifs
    };
}
