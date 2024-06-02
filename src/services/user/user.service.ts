import { eq, type InferInsertModel } from "drizzle-orm";
import { users } from "../../config/db/schema";
import { db } from "../../config/db";
import argon2  from "argon2";

export async function createUser(data:InferInsertModel<typeof users>){

    const hasshedPass=await argon2.hash(data.password);
    const result=await db.insert(users).values({
        ...data,
        password:hasshedPass
    }).returning({
        id:users.id,
        name:users.name,
        email:users.email,
        applicationId:users.applicationId 
    })
    return result[0]
}



export async function getUserByApplicationId(applicationId:string){
    const result=await db.select({
        id:users.id,
        applicationId:users.applicationId
    }).from(users).where(eq(users.applicationId,applicationId)).limit(1)
    return result
}