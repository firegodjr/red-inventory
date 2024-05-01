import express from 'express';
import userController from './controllers/user';
import authController from './controllers/auth';
import fs from 'fs/promises';
import path from 'path';
import assetsRouter from './assetsRouter';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import authMiddleware from './middleware/authMiddleware';

const port = process.env.PORT || 3000;

const app = express();
let prisma = new PrismaClient();

app.use(cookieParser());
app.use(express.json());
// Adds logged-in user and other things to res.locals
authMiddleware(app, prisma);
// Register api controller endpoints
userController(app, prisma);
authController(app, prisma);

app.get('/api/v1/hello', (_req, res) => {
    res.json({ message: 'Hello, world!' });
});

const environment = process.env.NODE_ENV;
const simpleRouter = express.Router();
simpleRouter.get('/*', async (_req, res) => {
    const routerData = {
        environment,
        manifest: await parseManifest(),
        path: '/'
    };
    res.render('index.html.ejs', routerData);
});

const publicPath = path.join(path.resolve(), 'public');
app.use('/', express.static(publicPath));
app.use(simpleRouter);
app.use(assetsRouter);

app.listen(port, () => {
    console.log('Server listening on port', port);
});

const parseManifest = async () => {
    if (environment !== 'production') return {};

    const manifestPath = path.join(path.resolve(), 'dist', 'manifest.json');
    const manifestFile = await fs.readFile(manifestPath);

    return JSON.parse(manifestFile.toString());
};
