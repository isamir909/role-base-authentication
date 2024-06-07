import { z } from "zod";
import { ALL_PERMISSIONS } from "../../config/permissions";


export const createRoleBodySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(255, { message: "Name cannot be longer than 255 characters" }),
  permissions: z.array(z.enum(ALL_PERMISSIONS)),
  applicationId: z.string().uuid()

});



export const assignRoleToUserBody=z.object({
  userId:z.string().uuid(),
  roleId:z.string().uuid(),
  applicationId:z.string().uuid()
})