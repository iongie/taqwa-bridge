import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import { api } from './api/api.router';
import { databaseSetting } from './api/api.setting';

export function app(): express.Express {
    const app = express();
    databaseSetting.initialize()
        .then(() => {
            console.log("connect db");
        }).catch((err: Error) => {
            console.log(err);
        })
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text({ type: 'text/html' }));
    app.use(bodyParser.raw());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/browser'));
    api(app);

    return app;
}

function run(): void {
    const port = process.env['PORT'] || 4000;
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();