import { toUserDto } from '../../dto';
import type { PrismaClient, User } from '@prisma/client';
import { type Application } from 'express';

const PREFIX = '/api/user';

export default function register(app: Application, prisma: PrismaClient) {
    app.get(PREFIX + '/getInventoriesForSelectedCrew', async (req, res) => {
        console.log('getting inventories...');
        let user: User = res.locals.user;
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
            console.log(inventories);
            res.json(inventories);
        } else if (user) {
            // user has no selected crew
            res.sendStatus(404);
        } else {
            // not logged in
            res.sendStatus(403);
        }
    });

    app.get(PREFIX + '/getCrews', async (req, res) => {
        let user: User = res.locals.user;
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
        let user: User = res.locals.user;
        if (user) {
            res.json(toUserDto(user));
        } else {
            res.sendStatus(403);
        }
    });
}
