# CareFirst AI Task Log

## Handover preparation
- User is moving project context from a previous AI session after reaching usage limits.
- Local Windows project root reported by user: `D:\carefirst-clinic-react-project\carefirst-clinic\backend\backend`.
- A report was generated and uploaded as `project-report.md`.
- This handover is reconstructed from the uploaded report and prior conversation, not from private Claude conversation history.

## Verified from the captured report
- Maven Spring Boot backend, package `com.carefirst.backend`, Java 21.
- PostgreSQL driver and Flyway migrations are configured in `pom.xml`.
- Controllers exist for health, clinic, department, doctor, and doctor slots.
- Services exist for clinic, clinic hours, departments, doctors, and slots.
- JPA entities exist for Clinic, ClinicHours, Department, Doctor, DoctorSchedule, and DoctorTag.
- Flyway migrations V1 through V7 are present.
- Tests listed: HealthControllerTest, SlotGeneratorTest, SlotServiceTest.
- At report time, Git status showed `main` ahead of `origin/main` by 7 commits, plus untracked export files. Recheck before any Git operation.

## Code behavior already discussed with the user
- `GET /api/health` returns a map with `status=ok`; it does not prove database health.
- `GET /api/clinic` delegates to `ClinicService.get()`.
- `GET /api/clinic/hours` delegates to `ClinicHoursService.listAll()`.
- `ClinicRepository.findFirstByOrderByIdAsc()` selects the lowest-ID clinic and returns `Optional<Clinic>`.
- `ClinicService.get()` maps the clinic through `ClinicResponse.from(...)`, or throws `NotFoundException("Clinic is not set up")`.
- `ClinicResponse` fields: id, name, phone, smsNumber, address, district, parkingInfo, mapUrl.

## Not yet known
- The user's next feature or bug to work on.
- Whether all tests pass on the current machine.
- Whether the app currently starts and connects to the configured database.
- Exact frontend/UI behavior expected from the original design.
- Whether the current Git status has changed since the report.

## Recommended first steps for the next AI
1. Read `AI_PROJECT_CONTEXT.md` and `AI_RULES.md`.
2. Ask the user what feature or issue they want to continue with, unless they provide it in the same prompt.
3. Inspect Git status and the relevant existing code before editing.
4. Run `mvn test` if the environment permits; report failures honestly.
5. For any task, explain the relevant Spring Boot flow in beginner-friendly terms.
