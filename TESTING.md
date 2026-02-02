# TESTING.md

## Testing Guide

### Unit & Integration Tests (API)

```bash
cd apps/api
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test -- --coverage  # With coverage report
```

### Test Structure

Tests are in `apps/api/tests/`:
- `auth.test.ts`: Authentication flows (register, login, duplicate email)
- `bookings.test.ts`: Booking business rules (past dates, overlaps)

### Running Specific Tests

```bash
pnpm test auth.test.ts
pnpm test bookings.test.ts
```

### Test Examples

**Register test**:
```typescript
test('register - success', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'a@b.com', password: 'secret', businessName: 'X' });
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('tokens');
});
```

**Booking overlap test**:
```typescript
test('overlapping booking is rejected', async () => {
  const res = await request(app)
    .post('/api/bookings')
    .set('Authorization', 'Bearer token')
    .send({ serviceId: 1, clientId: 1, date: '2030-01-01', startTime: '10:30' });
  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/overlaps/);
});
```

### Adding New Tests

1. Create file in `tests/` with `*.test.ts` suffix
2. Import test utilities:
```typescript
import request from 'supertest';
import app from '../src/app';
jest.mock('../src/prisma', () => require('./__mocks__/prisma').default);
```

3. Write tests with Jest syntax:
```typescript
describe('Feature name', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should do something', async () => {
    // arrange
    // act
    // assert
  });
});
```

### Mocking Database

Use `tests/__mocks__/prisma.ts`:
```typescript
const mock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  // ... more models
};
```

### Frontend Testing (Future)

When adding React tests:
```bash
cd apps/web
pnpm test
```

Use `@testing-library/react`:
```tsx
import { render, screen } from '@testing-library/react';
import { LoginPage } from './pages/LoginPage';

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
});
```

### Coverage Goals

- **API**: Aim for 80%+ coverage
- **Critical paths**: 100% (auth, bookings)
- **UI**: Smoke tests for main flows

### CI/CD Testing

Add to GitHub Actions `.github/workflows/test.yml`:
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: bookinglite_test
          MYSQL_ROOT_PASSWORD: test
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: cd apps/api && pnpm test
```

### Debugging Tests

```bash
# Debug mode
node --inspect-brk ./node_modules/jest/bin/jest.js

# Verbose output
pnpm test -- --verbose

# Single test
pnpm test auth.test.ts -t "register - success"
```

### Test Database Isolation

Each test should:
1. Clear mocks before test
2. Use fixtures or factories for data
3. Clean up after (or use in-memory DB)

Example:
```typescript
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  // cleanup if needed
});
```
