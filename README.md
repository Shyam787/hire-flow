# HireFlow

HireFlow is a production-style job board built with Next.js, TypeScript, Prisma, PostgreSQL, and Supabase Auth. It is designed as a technical assessment project that feels like a real SaaS MVP: candidates can discover and apply to roles, while employers can review hiring activity through the dashboard.

## Features

- Landing page with hero search, featured jobs, companies, categories, workflow, and CTA sections
- Job browsing with keyword, skill, company, location, employment type, sorting, empty states, and pagination
- Job details pages with company context, salary, skills, metadata, and an authenticated apply workflow
- Companies directory with search and open-role previews
- Supabase authentication for registration, login, logout, and protected dashboard access
- Role-aware signup for candidates and employers
- Candidate profile management and application history
- Employer company profile management
- Employer job create, edit, delete, draft, publish, and close workflows
- Applicant review with application status updates
- Prisma schema for users, companies, jobs, and applications
- Responsive, accessible UI built with reusable components
- GitHub Actions CI for install, Prisma generation, type checking, linting, and build verification

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS and shadcn-style UI primitives
- Prisma ORM
- PostgreSQL
- Supabase Auth
- Vercel deployment target

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:3000`.

## Environment Variables

Create `.env` and `.env.local` as needed with:

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

`DATABASE_URL` and `DIRECT_URL` are used by Prisma. The Supabase public variables are used by server/client auth helpers.

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate deploy
```

Seed local data:

```bash
node prisma/seed.js
```

## Development Workflow

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

Run type checking, linting, and build verification before opening a pull request.

## Architecture

The project uses a feature-oriented structure:

```text
src/app               App Router pages and API routes
src/components        Shared, feature, and UI components
src/features          Domain actions and queries
src/lib               Prisma, Supabase, and utility helpers
src/types             Shared TypeScript types
src/validations       Zod schemas
prisma                Database schema, migrations, and seed data
docs                  Architecture, decisions, changelog, and planning notes
```

Server components load job and company data directly through Prisma. Server actions handle authenticated mutations such as profile updates, company management, job posting, applications, and applicant status changes. The schema keeps the core entities normalized around users, companies, jobs, and applications.

## Authentication

Supabase Auth handles registration, login, logout, and session retrieval. New signups are mirrored into the Prisma `User` table with a candidate or employer role so applications, company ownership, and dashboard workflows can be connected to authenticated users.

## End-to-End Workflows

Candidate:

1. Sign up as a candidate.
2. Browse and filter jobs.
3. Open a job details page.
4. Submit an application with a cover letter and resume or portfolio URL.
5. Review application history from the dashboard.
6. Manage profile details from `/dashboard/profile`.

Employer:

1. Sign up as an employer.
2. Create a company profile.
3. Publish, edit, close, draft, or delete jobs.
4. Review applicants from `/dashboard/employer`.
5. Update applicant status through pending, reviewing, shortlisted, rejected, and hired stages.

## CI

GitHub Actions runs on pushes and pull requests to `main`:

- `npm ci`
- `npx prisma generate`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

Repository secrets required for CI mirror the environment variables listed above.

## Deployment

Deploy to Vercel with the same environment variables configured in the Vercel project. Use a production PostgreSQL database and Supabase project.

Deployment checklist:

1. Create Supabase project and copy the project URL plus anon key.
2. Create a production PostgreSQL database.
3. Add `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel.
4. Add the same variables as GitHub Actions repository secrets.
5. Run `npm run db:migrate` against production.
6. Optionally run `npm run db:seed` for demo data.
7. Deploy on Vercel.
8. Smoke test signup, login, company creation, job posting, application submission, applicant review, and logout on the live URL.

## Future Improvements

- Add explicit candidate and employer roles
- Add employer-owned companies and full job create/edit/delete flows
- Add resume upload and cover letter fields to applications
- Add application status transitions and notification emails
- Add end-to-end tests for authentication and application workflows
