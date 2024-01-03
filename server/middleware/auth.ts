import { PrismaClient, User } from "@prisma/client";
import { GetSessionExpiry, SESSION_COOKIE } from "~/server/authUtil";
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
            if(new Date() > session.expiration) {
                return;
            }
            else {
                session.expiration = GetSessionExpiry(3*24*60);
                prisma.session.update({
                    data: session,
                    where: {
                        token: token
                    }
                });
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: session?.userId
                }
            });
    
            if (user) {
                event.context.user = user;
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
