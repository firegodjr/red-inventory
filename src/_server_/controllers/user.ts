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
}
