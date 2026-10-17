# CareFirst Backend — AI Project Context

## Purpose and confidence
This document is reconstructed from the uploaded `project-report.md` and the code snippets shared in the conversation. It describes code present in the report; it does not recover Claude's private conversation history or undocumented product decisions.

## Project identity and stack
- Maven project: `com.carefirst:backend:0.0.1-SNAPSHOT`
- Spring Boot parent version declared in `pom.xml`: `4.1.1`
- Java version: `21`
- Persistence: Spring Data JPA / Hibernate
- Database driver and Flyway support: PostgreSQL
- Web layer: Spring MVC
- Validation dependency is present.
- No Spring Security starter appears in the captured `pom.xml`; do not assume authentication/authorization exists.
- Base package: `com.carefirst.backend`
- Main entry point: `BackendApplication.java`, using `@SpringBootApplication` and `SpringApplication.run(...)`.

## Architecture
The captured source follows a conventional layered structure:
- `controller/`: REST endpoints
- `service/`: application/business logic
- `repository/`: Spring Data JPA database access
- `entity/`: JPA entities
- `dto/`: API response records / transfer objects
- `exception/`: custom exceptions and centralized HTTP error mapping
- `util/`: slot generation helper
- `config/`: clock and CORS configuration
- `src/main/resources/db/migration/`: Flyway SQL migrations

## Main domain areas
- Clinic details and opening hours
- Departments
- Doctors and doctor tags
- Doctor schedules
- Appointment slot generation and month/day availability

## Controllers and endpoints observed in the report
- `GET /api/health`: `HealthController.health()` returns `{"status":"ok"}`. This is an application health response and does not by itself prove the database is reachable.
- `GET /api/clinic`: returns `ClinicResponse` from `ClinicService.get()`.
- `GET /api/clinic/hours`: returns the list from `ClinicHoursService.listAll()`.
- `SlotController` is rooted at `/api/doctors/{doctorId}`:
  - `GET /api/doctors/{doctorId}/slots?date=YYYY-MM-DD`
  - `GET /api/doctors/{doctorId}/availability?month=YYYY-MM`
- `DepartmentController` and `DoctorController` exist. Inspect their captured source before asserting every endpoint or query parameter.

## Clinic API contract
`ClinicResponse` is a Java record with:
- `Long id`
- `String name`
- `String phone`
- `String smsNumber`
- `String address`
- `String district`
- `String parkingInfo`
- `String mapUrl`

`ClinicResponse.from(Clinic clinic)` maps these values from corresponding `Clinic` getters.

`ClinicRepository extends JpaRepository<Clinic, Long>` and defines:
`Optional<Clinic> findFirstByOrderByIdAsc()`.
This retrieves the clinic with the lowest ID, or an empty Optional when no clinic exists.

`ClinicService.get()` is read-only transactional. It converts the first clinic with `ClinicResponse.from(...)`; when none exists, it throws `NotFoundException("Clinic is not set up")`.

`ClinicHoursResponse` includes `dayOfWeek`, English `dayName`, `openTime`, `closeTime`, and `note`. The service orders records by day of week and maps them to DTOs.

## Doctor and scheduling DTOs observed
`DoctorResponse` fields include ID, name, title, department name/slug, photo URL, years of experience, consultation fee, average rating, rating count, board certification, visit type, room, featured flag, and tags.
`DayAvailabilityResponse`: date, past, today, availableSlots.
`DaySlotsResponse`: date, availableCount, morning, afternoon, evening.
`SlotResponse`: time and available flag.
Do not change JSON field names casually; the frontend may depend on them.

## Database migrations captured
- `V1__baseline.sql`
- `V2__create_department.sql`
- `V3__create_clinic.sql`
- `V4__create_clinic_hours.sql`
- `V5__create_doctor.sql`
- `V6__create_doctor_tag.sql`
- `V7__create_doctor_schedule.sql`

Use a new Flyway migration for schema changes rather than silently changing an already-applied migration, unless the user explicitly asks and the migration environment is known to be disposable.

## Tests captured
- `HealthControllerTest.java`
- `SlotGeneratorTest.java`
- `SlotServiceTest.java`

The report lists the tests but does not establish that they currently pass. Run Maven tests to verify.

## Error handling
The source includes `ApiError(status, message, timestamp)`, `NotFoundException`, `ConflictException`, and `GlobalExceptionHandler` with handlers for at least 404 not found and 409 conflict, plus request/validation errors. Check the full handler implementation before changing the API error contract.

## Git state at time of report generation
The report showed branch `main...origin/main [ahead 7]` and untracked `AI-Handoff-Export/` and `create-ai-handoff.ps1`. This is a snapshot from report generation, not necessarily the current state. Do not reset, clean, rebase, or push without explicit approval.

## Configuration and secrets
The export deliberately omitted `application.properties`, `application-dev.properties`, and `application-prod.properties` contents. Do not ask the user to paste credentials. If configuration is needed, ask for sanitized property names and non-secret values only, or use placeholders such as `${DB_PASSWORD}`.

## Known unknowns
- The actual frontend screen/interaction requirements are not fully documented by this backend report.
- The database's current live contents and whether the app successfully starts are not verified.
- The current task / next feature requested by the user is not yet specified in the captured report.
- Claude's hidden conversation history and undocumented design decisions cannot be reconstructed from source alone.
