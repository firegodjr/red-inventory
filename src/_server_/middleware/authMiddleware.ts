import type { Application } from 'express';
import { SESSION_COOKIE } from '../controllers/auth';
import { PrismaClient } from '@prisma/client';

export default function register(app: Application, prisma: PrismaClient) {
    app.use(async (req: any, res: any, next: any) => {
        const seshId = req.cookies[SESSION_COOKIE];

        const user = await prisma.user.findFirst({
            where: { sessions: { some: { id: seshId } } }
        });

        if (user) {
            res.locals.user = user;
            res.locals.seshId = seshId;
        }

        next();
    });
}
