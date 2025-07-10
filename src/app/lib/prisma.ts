import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Puedes quitar esto en producción si quieres menos logs
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;