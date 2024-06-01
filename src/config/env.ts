import dotenv from 'dotenv';
dotenv.config()

import { z } from 'zod';
import { logger } from '../utils/logger';

// Define the schema for environment variables
const envSchema = z.object({
    PORT: z.preprocess((val) => Number(val), z.number().default(8000).optional()),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development').optional(),
    DATABASE_URL: z.string().trim().min(1),
});



// Load environment variables
const env = process.env;

// Validate environment variables against the schema
try {
    envSchema.parse(env);
} catch (error:any) {
    logger.error('Error validating environment variables: Check .env file');
    for (const key in envSchema.shape) {
        if (Object.prototype.hasOwnProperty.call(envSchema.shape, key)) {
            if (error.errors.some((e: any) => e.path.includes(key))) {
                logger.error(`${key}: ${error.errors.find((e: any) => e.path.includes(key)).message}`);
            }
        }
    }
    process.exit(1);
}

// Export the validated environment variables
export const {  PORT, NODE_ENV, DATABASE_URL } = env;
