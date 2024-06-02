import {z} from "zod";

export const createApplicationBodySchema = z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(255, { message: "Name cannot be longer than 255 characters" }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(255, { message: "Description cannot be longer than 255 characters" })
    
  });