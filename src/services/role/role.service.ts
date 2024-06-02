import type { InferInsertModel } from "drizzle-orm";
import { and, eq } from "drizzle-orm";
import { roles, usersToRoles } from "../../config/db/schema";
import { db } from "../../config/db";

export async function createRole(data: InferInsertModel<typeof roles>) {
  const result = await db.insert(roles).values(data).returning();
  return result[0];
}

export async function getRoleByName({
  name,
  applicationId,
}: {
  name: string;
  applicationId: string;
}) {
  const result = await db
    // SELECT *
    .select()
    // FROM roles
    .from(roles)
    // WHERE name = ? AND applicationId ?
    .where(and(eq(roles.name, name), eq(roles.applicationId, applicationId)))
    .limit(1);

  return result[0];
}

export async function assignRoleToUser({
  userId,
  roleId,
  applicationId,
}:InferInsertModel<typeof usersToRoles>) {
  const result = await db
    .insert(usersToRoles)
    .values({ userId, roleId, applicationId })
    .returning();
  return result[0];
}
