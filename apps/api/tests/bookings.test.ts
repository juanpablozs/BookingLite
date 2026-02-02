import request from 'supertest';
import app from '../src/app';

jest.mock('../src/prisma', () => require('./__mocks__/prisma').default);
const prisma = require('./__mocks__/prisma').default;

describe('Booking rules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creating booking in the past is rejected', async () => {
    // mock service exists
    prisma.service.findFirst.mockResolvedValue({ id: 1, durationMinutes: 60, ownerId: 1 });
    // no existing bookings
    prisma.booking.findMany.mockResolvedValue([]);

    // create a booking with past date
    const payload = { serviceId: 1, clientId: 1, date: '2000-01-01', startTime: '10:00' };
    // need to set userId via auth middleware bypass: we'll call controller directly by setting header with fake token? simpler: mock verifyAccessToken to set userId
    // but our auth middleware reads JWT; instead, bypass by calling route without auth to get error 401. For testing business logic, call service directly is better, but keep integration style by mocking middleware.

    // simulate authenticated request by mocking middleware: set Authorization header but token verification isn't mocked here; easier: call bookingService directly - but tests should use endpoints. We'll instead temporarily mock auth middleware by forcing userId via header parsing in app: set header Authorization: 'Bearer faketoken' and mock jwt verify in utils.
    const jwtUtils = require('../src/utils/jwt');
    jest.spyOn(jwtUtils, 'verifyAccessToken').mockReturnValue({ userId: 1 });

    const res = await request(app).post('/api/bookings').set('Authorization', 'Bearer faketoken').send(payload);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/past/);
  });

  test('creating overlapping booking is rejected', async () => {
    prisma.service.findFirst.mockResolvedValue({ id: 1, durationMinutes: 60, ownerId: 1 });
    // existing booking from 10:00 to 11:00
    prisma.booking.findMany.mockResolvedValue([{ id: 2, date: '2030-01-01', startTime: '10:00', endTime: '11:00' }]);
    const jwtUtils = require('../src/utils/jwt');
    jest.spyOn(jwtUtils, 'verifyAccessToken').mockReturnValue({ userId: 1 });

    const payload = { serviceId: 1, clientId: 1, date: '2030-01-01', startTime: '10:30' };
    const res = await request(app).post('/api/bookings').set('Authorization', 'Bearer faketoken').send(payload);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/overlaps/);
  });
});
