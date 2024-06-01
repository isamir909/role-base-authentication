import { Server } from 'http';
import { logger } from "./logger";

export async function serverShutDown(server: Server): Promise<void> {
    // Close server to stop accepting new connections
    server.close((err?: Error) => {
        if (err) {
            logger.error("Error occurred while closing server:", err);
            process.exit(1);
        }
        logger.info("Server gracefully shut down.");
        process.exit(0);
    });

    // Force close server after 10 seconds
    setTimeout(() => {
        logger.error("Forcefully shutting down server due to timeout.");
        process.exit(1);
    }, 10000);
}
