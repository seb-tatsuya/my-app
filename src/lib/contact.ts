import { prisma } from "@/lib/prisma";

// DBから複数のレコードを取得
export async function getContacts() {
  return await prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// DBから1レコードを取得
export async function getContact(id: string) {
  return await prisma.contact.findFirst({
    select: { name: true, email: true },
  });
}
