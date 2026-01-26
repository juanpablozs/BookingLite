import prisma from '../prisma';

export async function createClient(ownerId: number, data: any) {
  return prisma.client.create({ data: { ...data, ownerId } });
}

export async function updateClient(ownerId: number, id: number, data: any) {
  return prisma.client.updateMany({ where: { id, ownerId }, data });
}

export async function deleteClient(ownerId: number, id: number) {
  return prisma.client.deleteMany({ where: { id, ownerId } });
}

export async function getClient(ownerId: number, id: number) {
  return prisma.client.findFirst({ where: { id, ownerId } });
}

export async function listClients(ownerId: number, query?: string) {
  const where: any = { ownerId };
  if (query) {
    where.OR = [{ name: { contains: query } }, { email: { contains: query } }];
  }
  const data = await prisma.client.findMany({ where, orderBy: { createdAt: 'desc' } });
  return { data, total: data.length };
}
