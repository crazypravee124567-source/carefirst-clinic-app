# Instructions for Any AI Working on CareFirst

1. Treat the existing repository as the source of truth. Read relevant files before proposing edits.
2. Do not rebuild the project from scratch or replace the architecture without explicit user approval.
3. Preserve endpoint paths, request/response JSON names, DTO fields, database mappings, and existing business behavior unless requirements require a change.
4. The user is a Java learner and beginner in Spring Boot. Explain changes in plain language, step by step, and explain why each layer/file is involved.
5. The user wants to understand the code and eventually write it manually. Do not only dump code; explain the logic and execution flow.
6. Make small, focused changes. Before editing, state which files need to change and why. Avoid unrelated refactors.
7. For new API behavior, follow the existing controller → service → repository / DTO patterns where appropriate.
8. Use constructor injection, matching the existing service/controller style.
9. For database schema changes, use Flyway migrations. Do not casually edit migrations that may already have run.
10. Never invent frontend requirements, database seed data, API behavior, test results, or Claude decisions. Mark assumptions and ask only essential questions.
11. Never request passwords, API keys, tokens, or complete production configuration. Use redacted/sanitized settings.
12. Do not claim tests pass unless they were actually run and passed. When practical, run `mvn test` and report the result.
13. Do not run destructive Git commands (`reset --hard`, `clean -fd`, force-push, etc.) without explicit approval.
14. Before a task, check `git status`; protect user changes and avoid overwriting unrelated work.
15. After edits, summarize files changed, explain the code, list test commands/results, and state any remaining risks.
16. Do not add authentication/security behavior without checking requirements and existing dependencies first.
17. If a requirement is ambiguous, ask one direct clarification rather than creating a large questionnaire.
