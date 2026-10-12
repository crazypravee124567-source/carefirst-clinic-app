# CareFirst Clinic Booking System — UI/UX Direction

## 1. Design goal

Make booking feel quick and reassuring, especially on a phone. Reduce receptionist workload without making patients create accounts or exposing anyone else's information. Use calm, clear clinic-oriented visuals; prioritize readable content and obvious next steps over decoration.

## 2. Users and design priorities

- **Patients:** Find a doctor, choose a date and slot, enter contact details, and receive confirmation with minimal friction.
- **Receptionist:** Quickly scan today's appointments and perform common actions with clear status feedback.
- **Owner:** Manage doctors and schedules without needing technical knowledge.

## 3. Public booking flow

1. **Choose a doctor:** Show name, specialization, and active availability; avoid unnecessary profile details.
2. **Choose a date:** Use a simple date selector that disables past dates and dates without a schedule.
3. **Choose a slot:** Present available times as large, touch-friendly buttons. Refresh or handle stale availability on submission.
4. **Enter details:** Ask only for patient name and phone. Explain briefly that details are used to manage the appointment. No patient account or payment step.
5. **Confirm:** Show doctor, date/time in IST, clinic instructions if supplied, and the unique booking code. Explain how to keep the code private.

If a slot is taken between display and submission, preserve entered information where safe and show “This slot was just booked. Please choose another.” Do not imply a booking succeeded until the server confirms it.

## 4. Admin experience

- Default appointment view to today; provide date/status filters and a clear empty state.
- Show only information needed for reception work; restrict access to authenticated staff.
- Make appointment status visually distinct using text as well as color.
- Confirm consequential actions such as cancellation; make “Mark done” and “Cancel” labels explicit.
- Doctor/schedule forms should use plain language, weekday selection, clear time fields, and slot length units.
- Provide success/error feedback and protect against accidental duplicate submissions.

## 5. Visual and interaction direction

- Calm, clean healthcare tone with high contrast and restrained color use.
- Mobile-first responsive layout; booking controls should be easy to tap.
- Use readable type sizes, consistent spacing, clear form labels, and concise helper text.
- Use inline validation near the relevant field, with an accessible summary for submission errors.
- Do not communicate status by color alone; include text/icons with accessible names.
- Include loading, empty, success, and error states for all asynchronous views.
- Avoid displaying sensitive patient data in public pages, URLs, or browser error messages.

## 6. Key screens

- Public landing / doctor selection.
- Doctor and date selection with available slots.
- Patient details and booking submission.
- Booking confirmation and booking-code lookup/cancel (if confirmed in scope).
- Admin login.
- Admin appointments list and appointment actions.
- Doctor management and schedule editor.

## 7. Content and unresolved inputs

Client to provide clinic address, contact information, branding/logo, doctor names/specializations, operating hours, holidays, booking/cancellation policy, and any appointment preparation instructions. Do not invent medical advice or clinic policies. Use IST consistently. Add a short privacy notice once the clinic confirms its data-use wording.

## 8. Accessibility and responsive acceptance

- All flows operable by keyboard and screen reader labels.
- Visible focus, sufficient contrast, semantic headings, and errors announced to assistive technology.
- Test common mobile widths and desktop layouts.
- No horizontal scrolling for core booking actions at supported mobile sizes.
