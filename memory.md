# CareFirst Clinic Booking System — Project Context

## Project

- **Name:** CareFirst Clinic Booking System
- **Client:** Dr. Meena, CareFirst Clinic
- **Freelancer:** Praveen
- **Budget:** ₹15,000
- **Timeline:** 3 weeks
- **Purpose:** Reduce receptionist workload by enabling patients to book clinic appointments online without accounts.
- **Recommended stack:** MERN (React, Express, MongoDB); Spring Boot/MySQL remains a valid alternative if selected deliberately.

## Product decisions

- Patients do not create accounts; a booking code can provide limited lookup/cancellation access.
- Receptionist and owner use authenticated admin access.
- Public pages expose doctor/slot information, never other patients' personal details.
- Payment is at the clinic; online payments are excluded.
- Slot uniqueness must be enforced at database/atomic reservation level, not by an application pre-check alone.
- The losing concurrent request returns HTTP 409 with a friendly slot-taken message.
- Cancellation frees a slot; appointment statuses are booked, cancelled, and done.
- All time handling is intended to use IST.

## Must confirm with client

- Slot length by doctor and clinic working schedules.
- Booking one slot per patient rule.
- Cancellation cutoff.
- Holiday/exception schedules and how walk-ins are recorded.
- Admin roles and account provisioning.
- Booking-code lookup/cancellation scope.
- Patient data retention/deletion, privacy wording, and contact details.
- Hosting plan, domain, paid service costs, and uptime expectations.

## Scope guardrails

- Must: public pages, booking, admin login, appointment list/actions, doctor schedules.
- Should: booking code, clear validation, mobile-first experience.
- Could: email/WhatsApp confirmation and today/week dashboard.
- Won't in this version: online payment, patient accounts, video consultation.
- Changes beyond approved scope need written estimate and timeline adjustment.

## Delivery and operations

- Three-week plan: requirements/design/data and APIs; booking/admin/frontend; tests/security/CI/deploy/handover.
- CI should run tests on every push.
- Use separate environment settings and keep secrets out of Git.
- Include health endpoint, uptime monitoring, database backup/restore instructions, and a concise handover note.
- Free hosting may sleep or be slow; disclose tradeoffs and any recurring costs.
- Possible support plan discussed: ₹1,000/month for fixes/updates, to be agreed separately.

## Current status

Draft project documentation generated from the initial project analysis. No client assumptions have yet been confirmed, and no implementation progress is recorded. Treat unresolved items as open questions rather than settled requirements.
