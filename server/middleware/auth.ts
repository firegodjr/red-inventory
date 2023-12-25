import { PrismaClient, User } from "@prisma/client";
import { SESSION_COOKIE } from "../authUtil";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const token = getCookie(event, SESSION_COOKIE);

    if (token) {
        //TODO can I do this in a single prisma call?
        const session = await prisma.session.findUnique({
            where: {
                token: token,
            }
        });

        if(session) {
            const user = await prisma.user.findUnique({
                where: {
                    id: session?.userId
                }
            });

            console.log(user);
    
            if (user) {
                event.context.user = toUserDTO(user);
            }
            else {
                console.error("Found session but no user?");
            }
        }
        else {
            console.error("Token provided but no matching session.");
        }
    }
    else {
        console.error("User is not signed in.");
    }
});

function toUserDTO(user: { id: number; email: string; username: string; pwdhash: string; }): any {
    return { id: user.id, email: user.email, username: user.username }
}
