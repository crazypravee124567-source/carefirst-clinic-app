# CareFirst Clinic Booking System — Product Requirements

**Client:** Dr. Meena, CareFirst Clinic  
**Prepared for:** Praveen  
**Budget:** ₹15,000  
**Delivery target:** 3 weeks  
**Status:** Draft — assumptions below require client approval

## 1. Product overview

Build a mobile-first clinic appointment website that lets patients find a doctor, view available appointment slots, and book without creating an account. The system should reduce receptionist phone/message workload while preventing double bookings and protecting patient information.

## 2. Goals and success criteria

- A patient can find a doctor, choose an available slot, and book without signing in.
- Every slot can have at most one active booking.
- The receptionist can view appointments and cancel or mark them done after signing in.
- The clinic owner can maintain doctors and schedules.
- The site validates booking data on the server and does not expose patient details publicly.
- The delivered system is tested, deployed, and accompanied by a short handover note.

## 3. Users and permissions

| User | Needs | Authentication |
|---|---|---|
| Patient | Find a doctor, see available slots, book quickly on a phone, retrieve/cancel a booking by code | No account; booking code for lookup/cancellation |
| Receptionist | Review appointments, cancel bookings, mark visits done, add walk-ins if supported | Admin login |
| Clinic owner (Dr. Meena) | All receptionist functions; manage doctors and schedules | Admin login with owner/admin role |

## 4. Scope

### Must have
- Public clinic/doctor browsing pages.
- Available-slot listing by doctor and date.
- Patient appointment booking without an account.
- Secure admin login.
- Admin appointment list with cancel and mark-done actions.
- Doctor and schedule management.
- Server-side validation and protection against double booking.

### Should have
- Booking code to look up and cancel an appointment.
- Clear validation and slot-conflict messages.
- Mobile-first responsive interface.
- Walk-in booking entry for receptionist, subject to confirmation.

### Could have
- Email or WhatsApp confirmation.
- Today/week dashboard and basic appointment counts.
- Browser end-to-end test using Playwright.

### Out of scope for this version
- Online payments; payment is at the clinic.
- Patient accounts or saved profiles.
- Video consultation.
- Automated messaging unless separately approved and budgeted.

Any feature outside this scope requires a written change request, revised estimate, and schedule approval.

## 5. Patient journeys

### Book an appointment
1. Patient opens the public site and selects a doctor.
2. Patient selects a date and chooses from available slots.
3. Patient enters name and phone number and submits.
4. Server validates the request and atomically reserves the slot.
5. Patient sees confirmation and a unique booking code. The code is used to retrieve/cancel the appointment if that feature is approved.

### Admin manages appointments
1. Admin signs in.
2. Admin views appointments, with a useful default of today's appointments.
3. Admin cancels an appointment or marks it done.
4. A cancelled slot becomes available again; a done appointment remains in history and does not become bookable again for a past time.

### Admin manages clinic setup
1. Owner signs in.
2. Owner creates or edits a doctor and active status.
3. Owner configures weekday, opening/closing times, and slot length.

## 6. Functional requirements

- **FR-01 Doctor listing:** Public API returns active doctors and only public profile fields.
- **FR-02 Slot listing:** For a doctor and date, return valid future slots generated from the schedule minus active bookings.
- **FR-03 Booking:** Accept doctor, date, start time, patient name, and phone; create a booked appointment and return confirmation plus booking code.
- **FR-04 Collision handling:** If another request has reserved the slot first, return HTTP 409 with a clear “Slot already booked” message.
- **FR-05 Booking lookup/cancellation:** A sufficiently random booking code allows the holder to view limited booking details and, if within the cancellation window, cancel.
- **FR-06 Admin authentication:** Admin login uses securely hashed passwords and issues an authenticated session/token.
- **FR-07 Admin appointment management:** Authenticated admins can list appointments and cancel or mark an appointment done.
- **FR-08 Doctor/schedule management:** Authorized admin users can create/update doctors and schedules.
- **FR-09 Validation:** Reject missing/invalid name or phone, inactive/unknown doctor, invalid date/time, past slots, and slots not in the schedule.
- **FR-10 Walk-ins:** Receptionist can add a booking through the admin interface if confirmed in final requirements.
- **FR-11 Health check:** Provide a non-sensitive health endpoint for deployment monitoring.

## 7. Business rules and assumptions to confirm

These decisions affect implementation and must be approved by Dr. Meena before development:

- Appointment duration is fixed per doctor (for example, 15 or 20 minutes).
- One patient books one slot at a time.
- Patients may cancel only until a defined cutoff (example: 2 hours before).
- Past dates and times cannot be booked.
- All clinic times use India Standard Time (IST); storage/display behavior must be consistent.
- Walk-ins are entered by reception, not treated as public bookings.
- Payment is collected at the clinic; no online payment is included.
- Clinic opening hours, holidays, exceptions, and doctor-specific schedules need client input.
- Whether appointment status `done` can be changed back, and who may do so, needs confirmation.
- Data retention and deletion period for patient details needs confirmation.

## 8. Data and privacy

Collect only patient name and phone number necessary for appointment handling. Public routes must never reveal other patients' details. Booking codes must be long, random, and rate-limited. Display a short privacy notice at booking explaining why the data is collected and how the clinic uses it. Admin access and transport must be protected; production must use HTTPS.

## 9. Acceptance criteria

- A patient can book a valid available slot without an account.
- A booking is rejected for past times, invalid phone, missing name, inactive doctor, or a time outside the schedule.
- Concurrent attempts to book the same doctor/date/start time yield exactly one successful booking; the other receives HTTP 409.
- Cancelling a booking releases the slot, subject to the cancellation policy.
- Public API responses never contain another patient's name or phone.
- Admin appointment and management endpoints reject unauthenticated requests with HTTP 401/403.
- An authorized admin can list, cancel, and mark appointments done.
- The UI works on common mobile and desktop screen sizes.
- Tests, deployment configuration, health check, and handover note are delivered.

## 10. Delivery and constraints

Target delivery is three weeks for ₹15,000, treated as a tightly scoped portfolio-building engagement. Hosting costs, paid messaging, domain fees, and ongoing support must be agreed separately. Free-tier hosting may sleep or have limited availability; disclose this before launch.
