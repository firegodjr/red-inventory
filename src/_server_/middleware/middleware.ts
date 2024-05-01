export abstract class Middleware {
    protected constructor(app: any) {
        app.use(this.act);
    }

    abstract act(req: Express.Request, res: Express.Response, next: any): void;
}
