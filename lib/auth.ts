import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CANDIDATE",
        input: true,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = user.role === "EMPLOYER" ? "EMPLOYER" : "CANDIDATE";
          return { data: { ...user, role } };
        },
      },
    },
  },

  plugins: [nextCookies()],
});
