# Smart Event Management & Ticketing Platform

A full-stack MVC web application for Advanced Events (Pty) Ltd, built with Node.js, Express, EJS, MongoDB and Mongoose.

## Features

- User registration and login with bcrypt password hashing
- Role-based access control for admin and standard users
- Admin event CRUD with capacity management
- Event listing, details, search and filtering
- Ticket booking with automated capacity validation
- User booking history and cancellation
- Admin analytics dashboard for bookings, revenue, popular events and capacity usage
- Contact form with database-backed admin enquiry management
- MVC architecture with authentication, authorization and error middleware

## Project Structure

```text
src/
  config/          MongoDB connection
  controllers/     Request handlers
  middleware/      Auth, role checks and error handling
  models/          Mongoose schemas
  routes/          Express route definitions
  views/           EJS pages and layouts
public/
  css/             Styling
  js/              Browser JavaScript
  images/          Static image assets
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
copy .env.example .env
```

3. Make sure MongoDB is running locally, or replace `MONGODB_URI` in `.env` with a MongoDB Atlas connection string.

4. Seed sample users and events:

```bash
npm run seed
```

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Demo Accounts

Admin:

- Email: `admin@advancedevents.local`
- Password: `Admin123!`

Standard user:

- Email: `user@advancedevents.local`
- Password: `User123!`

## Admin Registration

Users register as standard users by default. To register a new admin through the UI, set `ADMIN_REGISTRATION_CODE` in `.env` and enter the same code during registration.

## Mandatory Pages Covered

- Home / Event Listing Page: `/`
- User Authentication Page: `/auth`
- Event Management Page: `/admin/events`
- Booking & Dashboard Page: `/dashboard`
- Contact / Enquiry Management Page: `/contact`
