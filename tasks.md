# CareFirst Clinic Booking System — Tasks and Progress

**Target:** 3 weeks  
**Budget:** ₹15,000  
**Status:** Not started — update task checkboxes during delivery.

## Week 1 — Confirm and foundation

- [ ] Confirm business assumptions with Dr. Meena in writing.
- [ ] Confirm doctor list, specializations, schedules, slot length, holidays, cancellation cutoff, and IST behavior.
- [ ] Confirm whether booking-code lookup/cancellation and receptionist walk-ins are in scope.
- [ ] Confirm privacy/retention wording, deployment ownership, domain, and hosting budget.
- [ ] Approve screen flow and UI direction (paper/Figma is sufficient).
- [ ] Create repository, project structure, environment configuration, and README.
- [ ] Set up MongoDB models for Admin, Doctor, Schedule, and Appointment.
- [ ] Implement doctor listing and protected doctor/schedule management APIs.
- [ ] Define and verify database-level active-slot uniqueness approach.
- [ ] Send 3-day progress update: “Design and data model ready for approval.”

## Week 2 — Booking and admin

- [ ] Implement schedule-based slot generation and IST/date validation.
- [ ] Implement public doctor and slot pages.
- [ ] Implement booking form and server-side validation.
- [ ] Implement atomic booking conflict handling and HTTP 409 response.
- [ ] Implement booking code generation and lookup/cancel if approved.
- [ ] Implement admin login, secure password hashing, and protected routes.
- [ ] Build admin appointment list with cancel and mark-done actions.
- [ ] Build doctor and schedule management screens.
- [ ] Add responsive states, loading indicators, empty states, and error messages.
- [ ] Send 3-day progress update: “Booking works end to end on my machine.”

## Week 3 — Quality, launch, and handover

- [ ] Unit-test slot generation, date/time rules, and cancellation cutoff.
- [ ] Integration-test booking, cancellation freeing the slot, and admin permissions.
- [ ] Add concurrency test proving only one same-slot booking succeeds.
- [ ] Test past dates, invalid phone, missing name, and public data privacy.
- [ ] Add rate limits, Helmet, CORS configuration, and production security review.
- [ ] Configure GitHub Actions to run tests on each push/pull request.
- [ ] Configure production environment variables and deploy app/database.
- [ ] Add `/health` endpoint and uptime monitor.
- [ ] Verify backup and restore steps for selected MongoDB Atlas plan.
- [ ] Run client acceptance review and fix agreed in-scope issues.
- [ ] Write handover note: login, doctor/schedule setup, downtime response, contacts, backup restore.
- [ ] Send final update: “Live link ready for your review.”

## Progress log

| Date | Update | Blockers / decisions | Owner |
|---|---|---|---|
| TBD | Project not started | Client assumptions and access pending | Praveen |

## Definition of done

- Approved requirements and scope are recorded.
- Core patient booking and admin flows work in production.
- Database prevents duplicate active bookings, with a passing concurrency test.
- Required security and validation checks pass.
- CI, health check, deployment, and handover documentation are complete.
- Client has reviewed and accepted the agreed deliverables.

## Change control

Anything outside the approved “Must have” scope (including online payments, patient accounts, video consults, paid messaging, or extra reporting) requires a written estimate and schedule change before implementation.
