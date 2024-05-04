import type { Application } from 'express';
import { SESSION_COOKIE } from '../controllers/auth';
import { PrismaClient } from '@prisma/client';

export default function register(app: Application, prisma: PrismaClient) {
    app.use(async (req: any, res: any, next: any) => {
        const seshId = req.cookies[SESSION_COOKIE];
        if (seshId) {
            const user = await prisma.userData.findFirst({
                where: { sessions: { some: { id: seshId } } },
                include: {
                    heldItems: true
                }
            });

            if (user) {
                res.locals.user = user;
                res.locals.seshId = seshId;

                const sfd = req.header('Sec-Fetch-Dest');
                if (sfd === 'document' && req.url.endsWith('/login')) {
                    res.redirect('/');
                } else {
                    next();
                }
            } else {
                res.locals.user = undefined;
                res.locals.seshId = undefined;

                const sfd = req.header('Sec-Fetch-Dest');
                if (sfd === 'document' && !req.url.endsWith('/login')) {
                    res.redirect('/login');
                } else {
                    next();
                }
            }
        } else {
            const sfd = req.header('Sec-Fetch-Dest');
            if (sfd === 'document' && !req.url.endsWith('/login')) {
                res.redirect('/login');
            } else {
                next();
            }
        }
    });
}
