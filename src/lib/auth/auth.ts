import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/drizzle"; // your drizzle instance

export const auth = betterAuth({
    trustedOrigins: [process.env.FRONTEND_URL ?? '*'],
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: false,
    },
    advanced: {
        database: {
            generateId: "uuid",
        }
    },
});