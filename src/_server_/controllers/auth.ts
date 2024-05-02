import type { LoginDto } from '@/dto';
import type { PrismaClient } from '@prisma/client';
import { type Application } from 'express';

const PREFIX = '/api/auth';
export const SESSION_COOKIE = 'DEADDROP_COYOTE_WUZ_HERE';

export default function register(app: Application, prisma: PrismaClient) {
    app.post(PREFIX + '/login', async (req, res) => {
        let body = req.body as LoginDto;
        console.log('Body:', body);

        // Check if user exists
        prisma.userAuth
            .findUnique({
                where: {
                    username: body.username,
                    pwdhash: hash(body.password)
                }
            })
            .then((user) => {
                if (!user) throw 'Got null or undefined user?';
                return prisma.session.create({
                    data: {
                        userId: user.dataId,
                        expiration: new Date(Date.now() + 15 * 60 * 1000) // 15 mins
                    }
                });
            })
            .then((sesh) => {
                res.cookie(SESSION_COOKIE, sesh.id);
                res.send(200);
            })
            .catch((error) => {
                console.log('Login error:', error);
                res.sendStatus(500);
            });
    });

    app.post(PREFIX + '/register', async (req, res) => {
        let body = req.body as LoginDto;
        console.log('Body:', body);

        // Check if user exists
        prisma.userAuth
            .findUnique({
                where: {
                    username: body.username
                }
            })
            .then((user) => {
                if (user) {
                    res.send(400);
                }
                return prisma.userAuth.create({
                    data: {
                        email: '',
                        username: body.username,
                        pwdhash: hash(body.password),
                        data: {
                            create: {}
                        }
                    }
                });
            })
            .then((userAuth) => {
                return prisma.session.create({
                    data: {
                        userId: userAuth.dataId,
                        expiration: new Date(Date.now() + 15 * 60 * 1000) // 15 mins
                    }
                });
            })
            .then((sesh) => {
                res.cookie(SESSION_COOKIE, sesh.id);
                res.send(200);
            })
            .catch((error) => {
                console.log('Login error:', error);
                res.sendStatus(500);
            });
    });
    app.post(PREFIX + '/logout', async (req, res) => {
        const user = res.locals.user;
        const seshId = res.locals.seshId;

        prisma.session.delete({ where: { id: seshId } }).catch((error) => {
            console.log('Logout error:', error);
        });

        res.sendStatus(200);
    });
}

function hash(pwd: string) {
    return pwd;
}
