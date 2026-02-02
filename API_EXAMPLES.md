# API Examples

Register:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@example.com","password":"secret123","businessName":"My Shop"}'
```

Login:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@example.com","password":"secret123"}'
```

Create Service (replace TOKEN):

```bash
curl -X POST http://localhost:4000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name":"Haircut","durationMinutes":30,"price":25}'
```

Create Client:

```bash
curl -X POST http://localhost:4000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Create Booking:

```bash
curl -X POST http://localhost:4000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"serviceId":1,"clientId":1,"date":"2030-01-01","startTime":"10:00"}'
```
