# Full-Stack Banking API with Fraud Detection

Production-style portfolio project simulating a fintech backend with fraud scoring, role-based admin review, and a React dashboard.

## Folder structure

```
backend/
  controllers/
  routes/
  middleware/
  services/
  models/
  utils/
  prisma/
  app.js
frontend/
  src/
    components/
    pages/
    services/
    App.js
```

## Database schema (Prisma)

See `backend/prisma/schema.prisma`.

Key tables:
- `User`
- `Account`
- `Transaction`
- `UserDevice`

## API routes

Public:
- `POST /register`
- `POST /login`

Authenticated:
- `GET /account`
- `GET /transactions`
- `GET /transactions/:id`
- `POST /transfer`

Admin:
- `GET /admin/fraud-transactions`
- `PATCH /admin/review/:transactionId`

## Running locally (no Docker)

1. Start Postgres.
2. Backend:

```
cd backend
copy .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

3. Frontend:

```
cd frontend
copy .env.example .env
npm install
npm run dev
```

## Running with Docker

```
docker compose up --build
```

## Notes
- Fraud scoring rules live in `backend/services/fraudService.js`.
- Transfers are executed inside a database transaction.
- Login is rate-limited.
