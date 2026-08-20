import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  try {
    const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/thermal_lexum";
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  } catch {
    return {} as PrismaClient;
  }
}

export const db: PrismaClient = globalForPrisma.prisma || createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
