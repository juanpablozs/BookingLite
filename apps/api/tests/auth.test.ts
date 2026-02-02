import request from 'supertest';
import app from '../src/app';

jest.mock('../src/prisma', () => require('./__mocks__/prisma').default);
const prisma = require('./__mocks__/prisma').default;

describe('Auth endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('register - success', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: 1, email: 'a@b.com', businessName: 'X', password: 'hashed' });
    prisma.refreshToken.create.mockResolvedValue({ token: 'rt' });

    const res = await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'secret', businessName: 'X' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('tokens');
    expect(prisma.user.create).toHaveBeenCalled();
  });

  test('register - duplicate email', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'a@b.com' });
    const res = await request(app).post('/api/auth/register').send({ email: 'a@b.com', password: 'secret', businessName: 'X' });
    expect(res.statusCode).toBe(400);
  });

  test('login - invalid credentials', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/auth/login').send({ email: 'no@pe.com', password: 'pass' });
    expect(res.statusCode).toBe(401);
  });
});
