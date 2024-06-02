import type { InferInsertModel } from "drizzle-orm";
import { applications } from "../../config/db/schema";
import { db } from "../../config/db";

export async function createApplication(data:InferInsertModel<typeof applications>){ 
    
    const result=await db.insert(applications).values(data).returning();
    return result[0];
}


export async function getApplications(){

    const result=await db.select({
        id:applications.id,
        name:applications.name,
        description:applications.description,
        createdAt:applications.createdAt
    }).from(applications);
    return result;
}