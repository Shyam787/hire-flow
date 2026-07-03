# HireFlow

HireFlow is a full-stack job marketplace built with Next.js, TypeScript, Prisma, PostgreSQL, and Supabase Auth. It is designed as a production-style hiring platform where candidates can discover and apply to roles while employers manage company profiles, job postings, and applicant pipelines.

The project goes beyond a static job board. It includes authenticated role-based workflows, database-backed job and company data, server actions for core mutations, and recruiter-facing applicant review tools that make the application feel like a real SaaS MVP.

## Highlights

- End-to-end candidate and employer workflows
- Role-aware authentication with protected dashboard routes
- Database-backed jobs, companies, users, and applications
- Employer job lifecycle management from draft to published or closed
- Applicant tracking with status updates
- Search, filtering, pagination, empty states, and responsive UI polish
- Prisma migrations and seed data for repeatable setup
- CI-ready scripts for type checking, linting, and production builds

## Product Features

### Candidate Experience

- Browse jobs with keyword, skill, company, location, employment type, and sorting filters
- View detailed job pages with company context, salary, skills, experience level, and posting metadata
- Apply to jobs through an authenticated application flow
- Submit cover letter and resume or portfolio URL details
- Track submitted applications from the candidate dashboard
- Maintain a candidate profile with skills, experience, education, links, preferences, and contact details

### Employer Experience

- Sign up as an employer and access protected employer routes
- Create and update a company profile with location, industry, contact, website, and social details
- Create, edit, publish, draft, close, and delete job postings
- Review applicants per job and inspect individual application details
- Move candidates through application stages: pending, reviewing, shortlisted, rejected, hired, and withdrawn
- Monitor recent hiring activity from the employer dashboard

### Platform Experience

- Landing page with hero search, featured jobs, companies, categories, workflow, and call-to-action sections
- Jobs directory with pagination and robust empty states
- Companies directory with searchable company profiles and open-role previews
- Shared navigation, loading states, form controls, dialogs, pagination, and reusable UI primitives
- Responsive layouts built for desktop and mobile usage

## Tech Stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React, Tailwind CSS, shadcn-style components, Radix UI primitives, Lucide icons
- Database: PostgreSQL
- ORM: Prisma
- Authentication: Supabase Auth with SSR helpers
- Validation: Zod
- Deployment target: Vercel

## Architecture

```text
src/app               App Router pages, layouts, loading states, and API routes
src/components        Shared, feature-specific, and UI components
src/features          Server actions and query helpers grouped by domain
src/lib               Prisma, Supabase, auth, user, and utility helpers
src/constants         Static UI and domain configuration
src/types             Shared TypeScript types
src/validations       Zod validation schemas
prisma                Database schema, migrations, and seed data
```

Server components read job and company data through Prisma. Server actions handle authenticated mutations such as profile updates, company management, job posting, application submission, withdrawal, and applicant status updates. Supabase Auth manages sessions, while the Prisma `User` record stores app-specific role and profile data.

## Data Model

The core schema is organized around four main entities:

- `User`: candidate or employer identity, profile details, preferences, and application settings
- `Company`: employer-owned company profile and contact information
- `Job`: company job posting with status, skills, salary, and metadata
- `Application`: candidate submission linked to a job with status history fields

Enums model important business states including user role, job status, and application status.

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL database
- Supabase project

### Installation

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

The app runs at `http://localhost:3000`.

### Environment Variables

Create `.env` or `.env.local` with the values below:

```bash
DATABASE_URL=""
DIRECT_URL=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

`DATABASE_URL` and `DIRECT_URL` are used by Prisma. The Supabase public variables are used by server and client auth helpers.

### Database Setup

Generate the Prisma client:

```bash
npm run db:generate
```

Apply migrations:

```bash
npm run db:migrate
```

Seed demo data:

```bash
npm run db:seed
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Quality Workflow

Before shipping changes, run:

```bash
npm run typecheck
npm run lint
npm run build
```

These commands verify TypeScript correctness, ESLint rules, Prisma generation during build, and production readiness.

## Deployment

HireFlow is ready for Vercel deployment. Configure the same environment variables in the Vercel project:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Recommended deployment checklist:

1. Create a production PostgreSQL database.
2. Create or configure a Supabase project.
3. Add production environment variables to Vercel.
4. Run Prisma migrations against production.
5. Deploy the app to Vercel.
6. Smoke test signup, login, job browsing, application submission, company setup, job posting, applicant review, and logout.

## CI/CD Readiness

The project includes the scripts needed for a professional CI pipeline:

- Install dependencies with `npm ci`
- Generate Prisma client with `npm run db:generate`
- Validate types with `npm run typecheck`
- Run lint checks with `npm run lint`
- Verify the production build with `npm run build`

A GitHub Actions workflow can be connected to Vercel for preview deployments on pull requests and production deployment from the main branch.

## Why This Project Matters

HireFlow demonstrates full-stack product thinking: not just UI screens, but connected user journeys, protected routes, relational data modeling, server-side mutations, form handling, dashboard workflows, and deployment readiness. It is built to show how a real hiring product could evolve from MVP into a production SaaS platform.

## Future Improvements

- Add notification emails for application status changes
- Add resume file uploads with storage integration
- Add advanced employer analytics and conversion metrics
- Add saved jobs and candidate recommendations
- Add end-to-end tests for authentication and application workflows
