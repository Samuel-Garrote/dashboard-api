# Dashboard API

NestJS backend for the [Angular Enterprise Dashboard](https://github.com/Samuel-Garrote/angular-enterprise-dashboard). Provides user management and JWT authentication over a PostgreSQL database.

**Live API:** https://dashboard-api-production-2463.up.railway.app

## Tech Stack

NestJS, Prisma ORM, PostgreSQL, JWT (`@nestjs/jwt`), bcrypt

## Endpoints

| Method | Endpoint        | Description                          | Auth required |
|--------|-----------------|---------------------------------------|----------------|
| POST   | `/auth/login`   | Log in, returns a JWT                 | No             |
| GET    | `/users`        | List users (supports `?search=`)      | Yes            |
| GET    | `/users/:id`    | Get a single user                     | Yes            |
| POST   | `/users`        | Create a user                         | No             |
| PATCH  | `/users/:id`    | Update a user                         | Yes            |
| DELETE | `/users/:id`    | Delete a user                         | Yes            |

All `/users` routes require a valid JWT sent as `Authorization: Bearer <token>`, except `POST /users` (account creation), which is public.

Passwords are hashed with bcrypt and never included in API responses.

## Running Locally

```bash
git clone https://github.com/Samuel-Garrote/dashboard-api.git
cd dashboard-api
npm install
```

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dashboard_db"
JWT_SECRET="your-secret-here"
```

Run migrations and start the server:

```bash
npx prisma migrate dev
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Roadmap

- Role-based route protection (admin-only endpoints)
- Refresh tokens
- Automated tests (unit + e2e)

## Author

Samuel Garrote — [GitHub](https://github.com/Samuel-Garrote)
