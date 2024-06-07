import type { Request, Response } from "express";
import { createApplicationBodySchema } from "../../types/application/application.type";
import { logger } from "../../utils/logger";
import {
  createApplication,
  getApplications,
} from "../../services/application/application.service";
import { ZodError } from "zod";
import { assignRoleToUser, createRole } from "../../services/role/role.service";
import { ALL_PERMISSIONS, SYSTEM_ROLES, USER_ROLE_PERMISSIONS } from "../../config/permissions";
import { assignRoleToUserBody, createRoleBodySchema } from "../../types/role/role.type";






export async function createRoleController(req: Request, res: Response) {
    try {
     
        const { name, permissions, applicationId } = createRoleBodySchema.parse(req.body);

        const role=await createRole({
          name,
          permissions,
          applicationId
        })

        return res.status(201).json({ status: true, data: role});
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
  export async function assignRoleToUserBodyController(req: Request, res: Response) {
    try {
        
      const {userId, roleId, applicationId } = assignRoleToUserBody.parse(req.body)
  
  
        const result = await assignRoleToUser({
          userId,
          roleId,
          applicationId
        });
  
        return res.status(201).json({ status: true, data: result });
  
    } catch (error) {
      if(error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => issue.message);
        return res.status(400).json({ status: false, error: errorMessages });
    }else{
      logger.error(error);
      return res
        .status(500)
        .send({ status: false, error: ["An unexpected error occurred"] });  
    }
  }
  
  }