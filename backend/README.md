# Alumni Platform Backend

## Setup

1. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL, ADMIN_PASS).
2. `npm install`
3. Create admin: `npm run seed-admin`
4. Start server: `npm run dev`

## Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/alumni/list
- GET /api/alumni/profile/:id
- PUT /api/alumni/me/update
- GET /api/admin/requests
- POST /api/admin/approve/:id
- POST /api/admin/reject/:id
- POST /api/admin/send-mail
