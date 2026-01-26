import prisma from '../prisma';
import bcrypt from 'bcrypt';

export async function registerUser(data: { email: string; password: string; businessName: string }) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw { status: 400, message: 'Email already registered' };

  const hash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({ data: { email: data.email, password: hash, businessName: data.businessName } });
  return user;
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  return user;
}

export async function saveRefreshToken(userId: number, token: string) {
  return prisma.refreshToken.create({ data: { userId, token } });
}

export async function revokeRefreshToken(token: string) {
  return prisma.refreshToken.deleteMany({ where: { token } });
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({ where: { token } });
}
