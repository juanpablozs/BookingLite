const mock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    deleteMany: jest.fn(),
    findUnique: jest.fn(),
  },
  service: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  booking: {
    findMany: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    aggregate: jest.fn(),
  },
  client: {
    findMany: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
  }
};

export default mock;
