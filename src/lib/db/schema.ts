import { boolean, pgTable, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';

export const timestamps = {
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
};

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    emailVerified: boolean().notNull().default(false),
    image: varchar("image"),
    ...timestamps,
});

export const session = pgTable("session", {
    id: uuid("id").primaryKey().defaultRandom(),
    expiresAt: timestamp("expires_at").notNull(),
    token: varchar("token").notNull().unique(),
    ipAddress: varchar("ip_address"),
    userAgent: varchar("user_agent"),
    userId: uuid("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    activeOrganizationId: uuid("active_organization_id"),
    activeTeamId: uuid("active_team_id"),
    ...timestamps,
});

export const account = pgTable("account", {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: varchar("account_id").notNull(),
    providerId: varchar("provider_id").notNull(),
    userId: uuid("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: varchar("access_token"),
    refreshToken: varchar("refresh_token"),
    idToken: varchar("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: varchar("scope"),
    password: varchar("password"),
    ...timestamps,
});

export const verification = pgTable("verification", {
    id: uuid("id").primaryKey().defaultRandom(),
    identifier: varchar("identifier").notNull(),
    value: varchar("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    ...timestamps,
});
