import type { Request, Response } from "express";
import {
  createUser,
  getUserByApplicationId,
  getUserByEmail,
} from "../../services/user/user.service";
import { createUserBodySchema, userLoginBodySchema } from "../../types/user/usr.type";
import { ZodError } from "zod";
import { logger } from "../../utils/logger";
import {
  assignRoleToUser,
  getRoleByName,
} from "../../services/role/role.service";
import argon2  from "argon2";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import { assignRoleToUserBody } from "../../types/role/role.type";


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

    if (!role) return res.status(404).json({ status: false, error: ["Role not found"] });

    const applications = await createUser({
      name,
      email,
      password,
      applicationId,
    });

    if (!applications) return res.status(400).json({ status: false, error: ["Failed to create user"]});
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



export async function userLoginController(req: Request, res: Response) {
  try {
      
    const { email, password, applicationId } = userLoginBodySchema.parse(req.body)

    // Get user by email
    const user = await getUserByEmail({applicationId, email});
    if(!user) return res.status(404).json({ status: false, error: ["User not found"] });

    // Check password
    const isPasswordValid = await argon2.verify(user.password, password);
    if(!isPasswordValid) return res.status(401).json({ status: false, error: ["Invalid credentials"] });
    
    // Exclude password from user object
    const { password: _, ...userWithoutPassword } = user;

    const token=jwt.sign(userWithoutPassword,JWT_SECRET!);

    return res.status(200).json({ status: true, data:{token}  });

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

