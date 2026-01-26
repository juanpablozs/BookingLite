import prisma from '../prisma';
import dayjs from 'dayjs';

function toDateTime(date: string, time: string) {
  return dayjs(`${date}T${time}`);
}

export async function createBooking(ownerId: number, data: any) {
  const service = await prisma.service.findFirst({ where: { id: data.serviceId, ownerId } });
  if (!service) throw { status: 400, message: 'Invalid service' };

  // compute endTime
  const start = toDateTime(data.date, data.startTime);
  const end = start.add(service.durationMinutes, 'minute');
  const now = dayjs();
  if (start.isBefore(now)) throw { status: 400, message: 'Cannot book in the past' };

  // check overlaps for same owner on same date
  const existing = await prisma.booking.findMany({ where: { ownerId, date: data.date } });
  for (const b of existing) {
    const bStart = toDateTime(b.date, b.startTime);
    const bEnd = toDateTime(b.date, b.endTime);
    if (start.isBefore(bEnd) && end.isAfter(bStart)) {
      throw { status: 400, message: 'Booking overlaps with existing booking' };
    }
  }

  return prisma.booking.create({ data: { ...data, ownerId, endTime: end.format('HH:mm') } });
}

export async function updateBooking(ownerId: number, id: number, data: any) {
  const booking = await prisma.booking.findFirst({ where: { id, ownerId } });
  if (!booking) return null;
  return prisma.booking.update({ where: { id }, data });
}

export async function deleteBooking(ownerId: number, id: number) {
  return prisma.booking.deleteMany({ where: { id, ownerId } });
}

export async function getBooking(ownerId: number, id: number) {
  return prisma.booking.findFirst({ where: { id, ownerId } });
}

export async function listBookings(ownerId: number, filters: any = {}) {
  const where: any = { ownerId };
  if (filters.status) where.status = filters.status;
  if (filters.date) where.date = filters.date;
  const data = await prisma.booking.findMany({ where, orderBy: { date: 'desc', startTime: 'desc' } });
  return { data, total: data.length };
}
