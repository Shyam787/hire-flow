AD-001: Use Next.js App Router ✅
AD-002: Use Prisma ORM ✅
AD-003: Use Supabase PostgreSQL ✅
AD-004: Use Feature-First Architecture ✅
AD-005: Use Living Documentation ✅

## Added:
AD-006: Target audience is technology professionals.
AD-007: UI style will prioritize clean, minimal, and professional over feature-heavy visuals.
AD-008: Design will be section-driven, with each landing page section implemented as an independent component.

## Added:
AD-009: Anonymous users can browse jobs before authentication.
AD-010: Search is the primary interaction and will be prominent in the hero section.
AD-011: Every page must support loading, empty, and error states.
AD-012: All screens will be composed from reusable sections and components.

## Added:
AD-013: Screen specifications will be completed before database design.
AD-014: Shared forms (like the Job Form) must be reused for both create and edit workflows.
AD-015: Database entities will be derived from UI data requirements rather than guessed upfront.

## Added:
AD-016: Prefer a simplified domain model over a fully normalized model to optimize for the 3-day delivery timeline.
AD-017: Use a single User entity with role-based behavior instead of separate Candidate and Employer entities.
AD-018: Company remains a separate entity because it represents a business object rather than an authentication role.

## Added:
AD-019: Core architecture is frozen before implementation begins.
AD-020: All fixed domain values will be modeled as enums instead of free-form strings.
AD-021: Seed data will represent a consistent fictional hiring ecosystem rather than random records.

## Added:
AD-022: Passwords will not be stored in Prisma because authentication is delegated to Supabase Auth.
AD-023: Skills, benefits, and requirements will be stored as string arrays for the MVP instead of normalized tables.
AD-024: Duplicate job applications are prevented with a composite unique constraint on (candidateId, jobId).
AD-025: Salary will be modeled as salaryMin and salaryMax rather than a formatted string.