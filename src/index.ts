import express from 'express';
import type {Express} from 'express';
import helmet from 'helmet';
import router from './routes';
import { logger } from './utils/logger';
import { serverShutDown } from './utils/serverShutDown';
import { PORT } from './config/env'; // Importing PORT from env.ts
const app:Express = express()

app.use(helmet());

app.use(express.json())

app.use("/",router);


const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

for (const signal of signals) {
    process.on(signal, async () => {
        logger.info(`Received ${signal}, starting graceful shutdown...`);
        await serverShutDown(server);
    });
}
