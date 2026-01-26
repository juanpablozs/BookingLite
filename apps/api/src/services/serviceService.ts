import prisma from '../prisma';

export async function createService(ownerId: number, data: any) {
  return prisma.service.create({ data: { ...data, ownerId } });
}

export async function updateService(ownerId: number, id: number, data: any) {
  return prisma.service.updateMany({ where: { id, ownerId }, data });
}

export async function deleteService(ownerId: number, id: number) {
  return prisma.service.deleteMany({ where: { id, ownerId } });
}

export async function getService(ownerId: number, id: number) {
  return prisma.service.findFirst({ where: { id, ownerId } });
}

export async function listServices(ownerId: number, page = 1, limit = 20, isActive?: boolean) {
  const skip = (page - 1) * limit;
  const where: any = { ownerId };
  if (typeof isActive === 'boolean') where.isActive = isActive;
  const [data, total] = await Promise.all([
    prisma.service.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.service.count({ where }),
  ]);
  return { data, total };
}
