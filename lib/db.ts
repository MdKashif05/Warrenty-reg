import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  try {
    return new PrismaClient();
  } catch {
    return {} as PrismaClient;
  }
}

export const db: PrismaClient = globalForPrisma.prisma || createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
