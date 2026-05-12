# Member 2 — Backend (Express / MongoDB)

This folder is my **backend deliverable** for WPR371: the Node.js and Express layer that handles HTTP routing, request handling, Mongoose data access, sessions, and server-side rendering hooks. EJS is configured in `app.js` (`view engine`, layouts, `res.render` targets).

---

## Stack

- **Node.js** — runtime  
- **Express.js** — app, routing, middleware  
- **Mongoose** — `User`, `Event`, `Booking`, `Enquiry` models and validation  
- **express-session** + **connect-mongo** — session store in MongoDB  
- **bcryptjs** — password hashing on `User`  
- **dotenv** — configuration via environment variables  

---

## What I implemented

| Area | Role |
|------|------|
| `server.js` | Bootstraps DB connection and starts the HTTP server |
| `src/app.js` | Express app: body parsers, `method-override`, static files, session, EJS + layouts, route mounts, 404 and error handler |
| `src/config/db.js` | Mongoose connection |
| `src/routes/` | Route modules for auth, events, admin events, bookings, contact, dashboard |
| `src/controllers/` | Handlers: auth, listing/filtering events, admin CRUD, booking create/cancel, contact CRUD, admin vs user dashboard data |
| `src/models/` | Schemas and refs for users, events, bookings, enquiries |
| `src/middleware/authMiddleware.js` | Session user attachment, `requireAuth`, `requireRole`, redirect-if-logged-in |
| `src/middleware/errorHandler.js` | Central error rendering |

---

## Routes I expose

| Area | Method | Path |
|------|--------|------|
| Events | GET | `/` |
| Events | GET | `/events/:id` |
| Auth | GET | `/auth` |
| Auth | POST | `/auth/register`, `/auth/login`, `/auth/logout` |
| Admin events | GET, POST | `/admin/events` |
| Admin events | GET | `/admin/events/:id/edit` |
| Admin events | PUT, DELETE | `/admin/events/:id` |
| Bookings | POST | `/bookings/events/:eventId` |
| Bookings | PATCH | `/bookings/:id/cancel` |
| Dashboard | GET | `/dashboard` |
| Contact | GET, POST | `/contact` |
| Contact (admin) | PATCH | `/contact/:id/status` |
| Contact (admin) | DELETE | `/contact/:id` |

Admin-only routes use `requireAuth` plus `requireRole('admin')`.

---

## Business logic (bookings & events)

- Booking **quantity** must be an integer from **1 to 10**.  
- **Capacity:** updates use an atomic condition so `ticketsBooked + quantity` never exceeds `capacity`; failed inserts roll back the ticket count.  
- **Cancellation:** confirmed bookings can be cancelled; event `ticketsBooked` is decremented accordingly.  
- **Admin edit event:** capacity cannot be set below current `ticketsBooked`.

---

## Environment variables

Defined in `.env.example`:

| Variable | Purpose |
|----------|---------|
| `PORT` | HTTP port (default 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `SESSION_SECRET` | Session cookie signing secret |
| `ADMIN_REGISTRATION_CODE` | If provided at registration, new user gets `admin` role |

---

## Scripts

```bash
npm install
copy .env.example .env
npm run dev
```

`npm start` runs `node server.js` without the file watcher.

---

## File layout (this deliverable)

```text
member-2-backend/
  README.md
  package.json
  server.js
  .env.example
  src/
    app.js
    config/db.js
    middleware/authMiddleware.js
    middleware/errorHandler.js
    models/User.js
    models/Event.js
    models/Booking.js
    models/Enquiry.js
    routes/authRoutes.js
    routes/eventRoutes.js
    routes/adminEventRoutes.js
    routes/bookingRoutes.js
    routes/contactRoutes.js
    routes/dashboardRoutes.js
    controllers/authController.js
    controllers/eventController.js
    controllers/adminEventController.js
    controllers/bookingController.js
    controllers/contactController.js
    controllers/dashboardController.js
```
