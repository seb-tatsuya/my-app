import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prismaインスタンスが存在しない場合は新しいインスタンスを作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 開発環境でのみ使用
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
