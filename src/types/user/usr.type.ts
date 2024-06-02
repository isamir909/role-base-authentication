import {z} from "zod";


export const createUserBodySchema=z.object({
        name:z.string({
            required_error:"Name is required"
        })
        .min(2,{message:"Name must be at least 2 characters long"})
        .max(255,{message:"Name cannot be longer than 255 characters"}),
        email:z.string({
            required_error:"Email is required"
        })
        .min(2,{message:"Email must be at least 2 characters long"})
        .max(255,{message:"Email cannot be longer than 255 characters"}),
        password:z.string({
            required_error:"Password is required"
        })
        .min(2,{message:"Password must be at least 2 characters long"}),
        applicationId:z.string({
            required_error:"Application Id is required"
        })
        .min(2,{message:"Application Id must be at least 2 characters long"})
       
})


