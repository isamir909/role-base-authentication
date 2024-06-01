import express from 'express';
import type {Express} from 'express';
import helmet from 'helmet';
import router from './routes';
import { logger } from './utils/logger';
import { serverShutDown } from './utils/serverShutDown';
import { PORT } from './config/env'; // Importing PORT from env.ts
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './config/db';
const app:Express = express()

app.use(helmet());

app.use(express.json())

app.use("/",router);



const server = app.listen(PORT, async() => {
    logger.info(`Server running on port ${PORT}`);

    // Migrate DB
    await migrate(db, {migrationsFolder: "./migrations"});

});
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

for (const signal of signals) {
    process.on(signal, async () => {
        logger.info(`Received ${signal}, starting graceful shutdown...`);
        await serverShutDown(server);
    });
}
