import { PrismaClient } from '@prisma/client';

import { env } from '@/modules/shared/infrastructure/config/env';

const createPrismaClient = () =>
  new PrismaClient({
    log: ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
