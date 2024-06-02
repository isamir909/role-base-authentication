import type { Request, Response } from "express";
import { createApplicationBodySchema } from "../../types/application/application.type";
import { logger } from "../../utils/logger";
import {
  createApplication,
  getApplications,
} from "../../services/application/application.service";
import { ZodError } from "zod";

export async function createApplicationController(req: Request, res: Response) {
  try {
    const { name, description } = createApplicationBodySchema.parse(req.body);

    const application = await createApplication({ name, description });

    return res.status(201).json({ status: true, data: application });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => issue.message);
      return res.status(400).json({ status: false, error: errorMessages });
    } else {
      logger.error(error);
      return res.status(500).send({ status: false, error: ["An unexpected error occurred"] });
    }
  }
}


export async function getApplicationController(req: Request, res: Response) {
  try {
    const applications = await getApplications();

    return res.status(200).json({ status: true, data: applications });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ status: false, error: error });
  }
}
