import prisma from '../prisma';

export async function dashboardStats(ownerId: number) {
  const total = await prisma.booking.count({ where: { ownerId } });
  const byStatus = await prisma.booking.groupBy({
    by: ['status'],
    where: { ownerId },
    _count: { status: true },
  });
  const today = new Date().toISOString().slice(0, 10);
  const bookingsToday = await prisma.booking.count({ where: { ownerId, date: today } });
  const revenueAgg = await prisma.booking.aggregate({
    _sum: { },
    where: { ownerId },
  });
  // estimate revenue by summing service prices for bookings
  const bookings = await prisma.booking.findMany({ where: { ownerId }, include: { service: true } });
  const estimatedRevenue = bookings.reduce((s, b) => s + (b.service?.price || 0), 0);

  return {
    total,
    byStatus: byStatus.map((b: any) => ({ status: b.status, count: b._count.status })),
    bookingsToday,
    estimatedRevenue,
  };
}
