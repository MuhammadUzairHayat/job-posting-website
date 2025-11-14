// lib/prisma.ts ✅ FIXED
import { PrismaClient } from "@prisma/client"; // ✅ Use the default generated Prisma client

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
