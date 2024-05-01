import type { PrismaClient } from '@prisma/client';
import { type Application } from 'express';

const PREFIX = '/api/user';

export default function register(app: Application, prisma: PrismaClient) {
    app.get(PREFIX + '/getInventoriesForSelectedCrew', (req, res) => {
        console.log('getting inventories...');
        res.json('hewwo');
    });
}
