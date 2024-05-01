import express from 'express';
import userController from './controllers/user';
import authController from './controllers/auth';
import fs from 'fs/promises';
import path from 'path';
import assetsRouter from './assetsRouter';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import authMiddleware from './middleware/authMiddleware';

const port = parseInt(process.env.PORT || '3000');

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

const publicPath = path.join(path.resolve(), 'public');
const assetsPath = path.join(path.resolve(), 'dist/assets');
app.use('/', express.static(publicPath));
app.use('/assets/', express.static(assetsPath));

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

app.use(simpleRouter);
app.use(assetsRouter);

app.listen(port, '0.0.0.0', () => {
    console.log('Server listening on port', port);
});

const parseManifest = async () => {
    if (environment !== 'production') return {};

    const manifestPath = path.join(path.resolve(), 'dist', 'manifest.json');
    const manifestFile = await fs.readFile(manifestPath);

    return JSON.parse(manifestFile.toString());
};
