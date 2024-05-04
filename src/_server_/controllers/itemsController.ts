import type { MarkItemHeldDto } from '@/dto';
import { PrismaClient, type Item } from '@prisma/client';
import type { Application } from 'express';

const PREFIX = '/api/items';

export default function register(app: Application, prisma: PrismaClient) {
    app.post(PREFIX + '/markItemHeld', (req, res) => {
        var body = req.body as MarkItemHeldDto;
        prisma.item
            .update({
                where: {
                    id: body.id
                },
                data: {
                    heldById: body.userId
                }
            })
            .then(() => {
                res.sendStatus(200);
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
    });

    app.get(PREFIX + '/getItems', (req, res) => {
        let itemIds = req.query.ids as string[];

        prisma.item
            .findMany({
                where: {
                    id: { in: itemIds }
                }
            })
            .then((items: Item[]) => {
                res.send(items);
            })
            .catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
    });
}
