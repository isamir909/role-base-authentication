import type { Request, Response } from "express";
import {
  createUser,
  getUserByApplicationId,
} from "../../services/user/user.service";
import { createUserBodySchema } from "../../types/user/usr.type";
import { ZodError } from "zod";
import { logger } from "../../utils/logger";
import {
  assignRoleToUser,
  getRoleByName,
} from "../../services/role/role.service";

export async function createUserController(req: Request, res: Response) {
  try {
    const { name, email, password, applicationId } = createUserBodySchema.parse(
      req.body
    );

    const initialUser = await getUserByApplicationId(applicationId);

    const roleName =
      initialUser.length > 0 ? "APPLICATION_USER" : "SUPER_ADMIN";

    const role = await getRoleByName({
      name: roleName,
      applicationId: applicationId,
    });

    if (!role) throw new Error("Role not found");

    const applications = await createUser({
      name,
      email,
      password,
      applicationId,
    });

    if (!applications) throw new Error("User not created");
    // Assign role
    await assignRoleToUser({
      userId: applications.id,
      roleId: role.id,
      applicationId: applicationId,
    });

    return res.status(201).json({ status: true, data: applications });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => issue.message);
      return res.status(400).json({ status: false, error: errorMessages });
    } else {
      logger.error(error);
      return res
        .status(500)
        .send({ status: false, error: ["An unexpected error occurred"] });
    }
  }
}
