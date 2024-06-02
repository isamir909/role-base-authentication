import type { Request, Response } from "express";
import { createApplicationBodySchema } from "../../types/application/application.type";
import { logger } from "../../utils/logger";
import {
  createApplication,
  getApplications,
} from "../../services/application/application.service";
import { ZodError } from "zod";
import { createRole } from "../../services/role/role.service";
import { ALL_PERMISSIONS, SYSTEM_ROLES, USER_ROLE_PERMISSIONS } from "../../config/permissions";

export async function createApplicationController(req: Request, res: Response) {
  try {
    const { name, description } = createApplicationBodySchema.parse(req.body);

    const application = await createApplication({ name, description });

    if(!application) throw new Error("Application not created");
   const superAdminRolePromise = await createRole({
      name:SYSTEM_ROLES.SUPER_ADMIN,
      applicationId: application.id,
      permissions: ALL_PERMISSIONS as unknown as Array<string>,
    })
 const applicationUserRolePromise=   await createRole({
      name:SYSTEM_ROLES.APPLICATION_USER,
      applicationId: application.id,
      permissions: USER_ROLE_PERMISSIONS,
    }) 

    const [superAdminRole, applicationUserRole] = await Promise.allSettled([superAdminRolePromise, applicationUserRolePromise]);

    if(superAdminRole.status==="rejected") throw new Error("Error creating super admin role");
    if(applicationUserRole.status==="rejected") throw new Error("Error creating application user role");
    
    return res.status(201).json({ status: true, data: {application,superAdminRole:superAdminRole.value,applicationUserRole:applicationUserRole.value} });
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
