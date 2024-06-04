import { toUserDto, type SelectCrewDto } from '../../dto';
import type { PrismaClient, UserAuth, UserData } from '@prisma/client';
import { type Application } from 'express';

const PREFIX = '/api/user';

export default function register(app: Application, prisma: PrismaClient) {
    app.get(PREFIX + '/getUserEmail', async (req, res) => {
        let user: UserData = res.locals.user;
        if (user) {
            let auth = await prisma.userAuth.findFirst({
                where: { dataId: user.id }
            });
            if (auth) {
                res.json(auth.email);
            } else {
                // A hanging userData with no userAuth to go with it? That's an error!
                res.send(500);
            }
        }
    });

    app.post(PREFIX + '/selectCrew', async (req, res) => {
        let user: UserData = res.locals.user;
        let body: SelectCrewDto = req.body;

        console.log(body);
        if (!body.crewId) {
            res.sendStatus(400);
            return;
        }
        prisma.userData
            .update({
                where: { id: user.id },
                data: {
                    selectedCrewId: body.crewId
                }
            })
            .then(() => {
                res.sendStatus(200);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    });

    app.get(PREFIX + '/getInventoriesForSelectedCrew', async (req, res) => {
        let user: UserData = res.locals.user;
        if (user && user.selectedCrewId) {
            let inventories = await prisma.inventory.findMany({
                where: { crewId: user.selectedCrewId },
                include: {
                    items: {
                        include: {
                            fields: true,
                            heldBy: true
                        }
                    }
                }
            });
            res.json(inventories);
        } else if (user) {
            // user has no selected crew
            res.sendStatus(404);
        } else {
            // not logged in
            res.sendStatus(403);
        }
    });

    app.get(PREFIX + '/getUser', async (req, res) => {
        const userId = req.query.id as string;
        if (userId) {
            await prisma.userData
                .findFirst({
                    where: { id: userId },
                    include: { heldItems: true, recvNotifs: true, UserAuth: true }
                })
                .then((user) => {
                    if (user) {
                        res.send(
                            toUserDto(
                                user.UserAuth as UserAuth,
                                user,
                                user.heldItems,
                                user.recvNotifs
                            )
                        );
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else {
            res.sendStatus(404);
        }
    });

    app.get(PREFIX + '/getCrews', async (req, res) => {
        let user: UserData = res.locals.user;
        if (user) {
            let crews = await prisma.crew.findMany({
                where: { users: { some: { id: user.id } } }
            });
            res.json(crews);
        } else {
            res.sendStatus(403);
        }
    });

    app.get(PREFIX + '/getAccount', async (req, res) => {
        let user: UserData & any = res.locals.user;
        if (user) {
            let auth = await prisma.userAuth.findUnique({ where: { dataId: user.id } });
            if (auth && user) {
                res.json(toUserDto(auth, user, user.heldItems, user.recvNotifs));
            } else {
                res.sendStatus(403);
            }
        }
    });
}
