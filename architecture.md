# CareFirst Clinic Booking System — Architecture

**Status:** Proposed; confirm stack and deployment with client.  
**Recommended stack:** React, Node.js/Express, MongoDB (MERN).

## 1. System shape

```text
Patient/Admin browser
        |
        | HTTPS / JSON
        v
React web client  --->  Express REST API  --->  MongoDB
                              |                    |
                         Auth + validation     unique slot constraint
                              |
                       /health endpoint
```

Use one JavaScript stack for faster delivery and simpler handover. Spring Boot/MySQL is a valid alternative if Java is a project goal; the database-level uniqueness principle still applies.

## 2. Components

- **React client:** Public doctor/slot/booking pages and protected admin screens; responsive, mobile-first UI.
- **Express API:** Public and admin routes, validation, business rules, authentication, rate limits, and consistent error responses.
- **MongoDB:** Admin, doctor, schedule, and appointment records. Enforce booking uniqueness in the database, not only in application code.
- **Deployment:** App on Render, Railway, or an agreed Vercel/API arrangement; MongoDB Atlas. Keep configuration in environment variables.

## 3. Data model

### Admin
- `id`
- `email` (unique)
- `passwordHash`
- `role` (`admin` or `owner`, if role distinction is required)
- `createdAt`

### Doctor
- `id`
- `name`
- `specialization`
- `active`
- timestamps

### Schedule
- `id`
- `doctorId`
- `weekday` (defined convention, e.g. 0–6)
- `startTime`, `endTime` (clinic-local time)
- `slotMinutes`
- optional effective dates/holiday exceptions if approved

### Appointment
- `id`
- `doctorId`
- `date` (clinic-local calendar date, normalized consistently)
- `startTime`
- `patientName`
- `phone`
- `status` (`booked`, `cancelled`, `done`)
- `bookingCode` (random, unique)
- `createdAt`, `updatedAt`

## 4. Booking concurrency and indexes

Slot availability is calculated from the doctor's schedule minus appointments that are still `booked`. Availability displayed to a browser is only a snapshot; the booking write must be atomic.

Use a database-enforced uniqueness strategy for active appointments on `(doctorId, date, startTime)`. In MongoDB, a partial unique index limited to `status: booked` is the intended approach, subject to verifying exact MongoDB version/index semantics before implementation. If that partial-index design is unsuitable, use a dedicated slot/reservation collection or transaction-based approach with an equivalent database-enforced invariant. On duplicate-key conflict, respond with HTTP 409 and a friendly message. Cancellation changes status and frees the slot.

A `done` appointment must not be treated as a future available slot; normally it refers to a past visit. Confirm the status lifecycle and uniqueness policy for unusual cases before implementation.

## 5. API contract

### Public
- `GET /api/doctors` — active doctors, public fields only.
- `GET /api/doctors/:id/slots?date=YYYY-MM-DD` — available future slots for that doctor/date.
- `POST /api/appointments` — create booking; return booking code and confirmation.
- `GET /api/appointments/:code` — limited booking lookup, if approved.
- `PATCH /api/appointments/:code` — cancellation only, with cancellation cutoff enforced.

### Admin (authenticated)
- `POST /api/admin/login` — authenticate and issue token/session.
- `GET /api/admin/appointments` — list/filter appointments.
- `PATCH /api/admin/appointments/:id` — cancel or mark done.
- `POST /api/admin/doctors`, `PUT /api/admin/doctors/:id` — create/update doctor.
- `POST /api/admin/schedules`, `PUT /api/admin/schedules/:id` — create/update schedule.
- Optional walk-in creation route through protected admin API.

### Operations
- `GET /health` — liveness response without secrets or patient data.

Use consistent JSON error shape, e.g. `{ "error": { "code": "SLOT_TAKEN", "message": "This slot was just booked. Please choose another." } }`.

## 6. Security and privacy controls

- Hash admin passwords with bcrypt (appropriate work factor configured for hosting).
- Prefer secure, HTTP-only cookies for browser sessions; if bearer tokens are used, keep expiry short and storage risks documented.
- Rate-limit admin login, booking, and booking-code lookup/cancellation endpoints.
- Validate and normalize all request data on the server; never trust client-calculated availability.
- Use Helmet, CORS allowlist, HTTPS, secure secret configuration, and `.env` in `.gitignore`.
- Return only minimal public fields; protect all admin routes with authentication and authorization.
- Use long, cryptographically random booking codes; avoid exposing sequential IDs as access credentials.
- Consider CAPTCHA only if abuse occurs or risk assessment requires it; it is not mandatory for initial delivery.
- Avoid logging patient names, phone numbers, passwords, tokens, or booking codes.

## 7. Deployment and operations

- Separate development and production environment variables.
- CI (GitHub Actions): install, lint if configured, and run tests on pushes/pull requests.
- Deploy app and Atlas database; set production secrets outside source control.
- Configure `/health` monitoring and an uptime monitor.
- Document database backup availability and the actual restore procedure for the selected Atlas plan.
- Provide a rollback/redeployment note and disclose free-tier sleep/availability limitations.
