# CareFirst Clinic Booking System — Coding Rules

## 1. General
- Use JavaScript consistently across client and server unless the client approves another stack.
- Keep modules small and separate routes, controllers, services, models, middleware, and validation.
- Use clear names that reflect clinic concepts; avoid hidden business logic in UI components.
- Do not commit secrets, `.env` files, database credentials, patient data, or production dumps.
- Keep dependencies minimal and record setup instructions in the README.

## 2. API and validation
- Validate every request on the server, including admin requests.
- Normalize date, time, phone, and email inputs before persistence.
- Treat browser availability as advisory; re-check constraints at write time.
- Use appropriate HTTP status codes: 400 validation, 401 unauthenticated, 403 forbidden, 404 missing, 409 slot conflict, 500 unexpected server error.
- Return consistent, user-safe error messages; never expose stack traces or database internals.
- Do not include patient details in public doctor, slot, or error responses.

## 3. Booking rules
- Persist clinic date/time in a documented, consistent IST-aware representation.
- Generate slots only within an active doctor's configured schedule and slot duration.
- Reject past slots and invalid schedule boundaries on the server.
- Enforce one active booking per doctor/date/start time using a database constraint/index or equivalent atomic reservation design.
- Convert duplicate-slot database conflicts into HTTP 409 `SLOT_TAKEN`.
- Cancellation must release the slot; retain a cancelled record for audit/history unless retention rules say otherwise.
- Use cryptographically secure, non-sequential booking codes and rate-limit their use.

## 4. Security and privacy
- Hash passwords with bcrypt; never store or log plaintext passwords.
- Require authentication and authorization for all admin routes.
- Apply rate limits to login, booking, and booking-code endpoints.
- Use Helmet, HTTPS in production, explicit CORS allowlist, and secure cookie/token settings.
- Collect only necessary patient fields. Do not log patient name, phone, booking code, credentials, or tokens.
- Keep secrets in environment variables and document required variables without values.

## 5. Frontend and accessibility
- Build mobile-first layouts and test narrow viewports.
- Use labels, keyboard-accessible controls, visible focus states, and clear validation messages.
- Disable or show progress on submission to reduce accidental repeat actions; server remains authoritative.
- Never rely on disabled buttons as a concurrency or security control.
- Show a clear alternative when a chosen slot becomes unavailable.

## 6. Testing
- Unit-test slot generation, time/date validation, and cancellation cutoff logic.
- Integration-test booking persistence, cancellation freeing a slot, and admin authorization.
- Prove concurrent booking behavior: exactly one successful reservation for the same slot.
- Test 401/403 on protected routes, past date rejection, invalid phone rejection, and public data minimization.
- Keep tests deterministic; use isolated test data and do not use real patient information.
- Add a browser booking flow test if schedule permits.

## 7. Git and delivery
- Use meaningful commits and avoid committing generated build output unless required by deployment.
- CI must run tests on pushes and pull requests.
- Update documentation when API contracts, environment variables, or business rules change.
- Record client-approved scope decisions and any change requests in writing.
