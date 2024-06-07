import { and, eq, type InferInsertModel } from "drizzle-orm";
import { roles, users, usersToRoles } from "../../config/db/schema";
import { db } from "../../config/db";
import argon2 from "argon2";

export async function createUser(data: InferInsertModel<typeof users>) {
  const hasshedPass = await argon2.hash(data.password);
  const result = await db
    .insert(users)
    .values({
      ...data,
      password: hasshedPass,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      applicationId: users.applicationId,
    });
  return result[0];
}

export async function getUserByApplicationId(applicationId: string) {
  const result = await db
    .select({
      id: users.id,
      applicationId: users.applicationId,
    })
    .from(users)
    .where(eq(users.applicationId, applicationId))
    .limit(1);
  return result;
}

export async function getUserByEmail({
  email,
  applicationId,
}: {
  email: string;
  applicationId: string;
}) {
  const result = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      applicationId: users.applicationId,
      roleId: roles.id,
      password: users.password,
      permissions: roles.permissions,
    })
    .from(users)
    .where(and(eq(users.email, email), eq(users.applicationId, applicationId)))
    // LEFT JOIN
    // FROM usersToRoles
    // ON usersToRoles.userId = users.id
    // AND usersToRoles.applicationId = users.application
    .leftJoin(
      usersToRoles,
      and(
        eq(usersToRoles.userId, users.id),
        eq(usersToRoles.applicationId, users.applicationId)
      )
    )
    // LEFT JOIN
    // FROM roles
    // ON roles.id = usersToRoles.roleId
    .leftJoin(roles, eq(roles.id, usersToRoles.roleId));

  if (!result.length) {
    return null;
  }

  const user = result.reduce((acc, curr) => {
    if (!acc.id) {
      return {
        ...curr,
        permissions: new Set(curr.permissions),
      };
    }

    if (!curr.permissions) {
      return acc;
    }

    for (const permission of curr.permissions) {
      acc.permissions.add(permission);
    }

    return acc;
  }, {} as Omit<(typeof result)[number], "permissions"> & { permissions: Set<string> });

  return {
    ...user,
    permissions: Array.from(user.permissions),
  };
}