# HireFlow AI-Generated Project Documentation

## 1. Project Overview

HireFlow is a full-stack job board and hiring workflow platform built for a technical assessment. The project is designed to feel like a real SaaS MVP rather than a static listing page. It supports two primary user groups:

- Candidates who want to discover jobs, review company details, apply to roles, and track their applications.
- Employers who want to create a company profile, publish job posts, manage applicants, and update hiring statuses.

The application uses Next.js App Router, TypeScript, Prisma, PostgreSQL, and Supabase Auth. It is deployed on Vercel and connected to GitHub for automated deployment from the main branch.

## 2. Assessment Requirements Coverage

| Requirement | Implementation |
| --- | --- |
| Build a job board using AI | HireFlow implements a complete job marketplace with candidate and employer workflows. |
| Push code to GitHub | Source code is available in the GitHub repository. |
| Write CI/CD pipeline using AI | GitHub Actions workflow validates install, Prisma generation, type checking, linting, and build. |
| Deploy to Vercel using CI/CD | The GitHub repository is connected to Vercel, and pushes to `main` trigger production deployment. |
| Write documentation using AI | This document provides complete AI-generated project documentation. |
| Submit final links | GitHub repository, Vercel demo, and documentation links are ready for submission. |

## 3. Live Links

- GitHub Repository: https://github.com/Shyam787/hire-flow
- Vercel Demo: https://hire-flow-kappa-lovat.vercel.app
- AI-Generated Documentation: https://github.com/Shyam787/hire-flow/blob/main/docs/AI_GENERATED_DOCUMENTATION.md

## 4. Core Features

### 4.1 Public Job Board

The public job board allows visitors to explore available roles before signing in. It includes:

- Job listing page with real database-backed job records.
- Keyword search for job titles and descriptions.
- Filtering by company, skill, location, employment type, and experience level.
- Sorting and pagination for scalable browsing.
- Empty states when no matching jobs are found.
- Individual job details pages with structured role information.

### 4.2 Job Details

Each job details page provides candidates with enough context to evaluate a role:

- Job title and company information.
- Salary, location, employment type, and experience level.
- Skills required for the role.
- Full job description.
- Company context and related metadata.
- Authenticated application entry point.

### 4.3 Company Directory

The company directory helps users explore employers on the platform:

- Searchable company listing.
- Company profile pages.
- Company details such as industry, size, location, website, and description.
- Open-role previews connected to each company.

### 4.4 Authentication

Authentication is handled with Supabase Auth and SSR-compatible helpers. The application supports:

- Candidate signup.
- Employer signup.
- Login.
- Logout.
- Protected dashboard routes.
- User records synced into the Prisma database.
- Role-aware application behavior based on candidate or employer accounts.

### 4.5 Candidate Dashboard

Candidates can manage their hiring profile and application activity:

- View candidate dashboard.
- Track submitted applications.
- Manage profile information.
- Store professional details such as skills, experience, education, links, preferred role, preferred work type, and salary expectation.
- Update account settings.

### 4.6 Employer Dashboard

Employers can manage the hiring side of the platform:

- Create and update company profile.
- Create new job postings.
- Edit existing jobs.
- Publish jobs.
- Save jobs as drafts.
- Close jobs.
- Delete jobs.
- Review applicants.
- View individual application details.
- Update applicant status across hiring stages.

### 4.7 Applicant Tracking

The applicant workflow models a lightweight hiring pipeline:

- Pending
- Reviewing
- Shortlisted
- Rejected
- Hired
- Withdrawn

Employers can update application status from the dashboard, while candidates can track their application history.

## 5. User Workflows

### 5.1 Candidate Workflow

1. Candidate signs up or logs in.
2. Candidate browses jobs from the jobs directory.
3. Candidate filters roles by relevant criteria.
4. Candidate opens a job details page.
5. Candidate submits an application with supporting details.
6. Candidate views submitted applications in the dashboard.
7. Candidate updates profile and preferences as needed.

### 5.2 Employer Workflow

1. Employer signs up or logs in.
2. Employer creates or updates a company profile.
3. Employer creates a job posting.
4. Employer publishes, drafts, closes, edits, or deletes jobs.
5. Employer reviews applicants for each job.
6. Employer updates applicant status through the hiring pipeline.
7. Employer monitors hiring activity from the dashboard.

## 6. Technical Architecture

HireFlow follows a feature-oriented structure:

```text
src/app               Next.js App Router pages, layouts, loading states, and API routes
src/components        Shared, feature-specific, and reusable UI components
src/features          Server actions and query helpers grouped by product domain
src/lib               Prisma, Supabase, authentication, user, and utility helpers
src/constants         Static product and UI configuration
src/types             Shared TypeScript types
src/validations       Zod validation schemas
prisma                Database schema, migrations, and seed data
.github/workflows     GitHub Actions CI workflow
docs                  Project documentation
```

## 7. Data Model

The Prisma schema models the core hiring domain:

### User

Stores account identity, role, candidate profile fields, employer profile fields, preferences, and notification settings.

Important fields include:

- `id`
- `email`
- `role`
- `firstName`
- `lastName`
- `skills`
- `location`
- `resumeUrl`
- `portfolioUrl`
- `linkedinUrl`
- `githubUrl`

### Company

Stores employer company information.

Important fields include:

- `name`
- `industry`
- `size`
- `description`
- `location`
- `website`
- `ownerId`

### Job

Stores job posting data.

Important fields include:

- `title`
- `description`
- `location`
- `employmentType`
- `experienceLevel`
- `salary`
- `skills`
- `status`
- `companyId`

### Application

Stores candidate applications.

Important fields include:

- `status`
- `coverLetter`
- `resumeUrl`
- `withdrawnAt`
- `userId`
- `jobId`

## 8. Technology Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript |
| UI | React, Tailwind CSS, shadcn-style UI primitives |
| Icons | Lucide React |
| Forms | React Hook Form |
| Validation | Zod |
| Authentication | Supabase Auth |
| Database | PostgreSQL |
| ORM | Prisma |
| Deployment | Vercel |
| CI | GitHub Actions |

## 9. CI/CD Pipeline

The GitHub Actions workflow is located at:

```text
.github/workflows/ci.yml
```

The CI workflow runs on pushes and pull requests to the `main` branch.

Pipeline steps:

1. Checkout repository.
2. Set up Node.js 20.
3. Install dependencies with `npm ci`.
4. Generate Prisma client.
5. Run TypeScript checks.
6. Run ESLint.
7. Build the production application.

Vercel is connected to the GitHub repository. When code is pushed to `main`, Vercel automatically builds and deploys the latest version to production.

## 10. Deployment Details

The application is deployed on Vercel:

```text
https://hire-flow-kappa-lovat.vercel.app
```

Production environment variables are configured in Vercel:

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The production database connection uses Supabase/PostgreSQL. The Vercel `DATABASE_URL` is configured for Prisma compatibility with the hosted pooler.

## 11. Environment Variables

The repository includes `.env.example` with placeholder values only:

```bash
DATABASE_URL=""
DIRECT_URL=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

Actual secret values are not committed to GitHub.

## 12. Quality and Reliability

The project includes several practices that improve maintainability:

- TypeScript for static type safety.
- Prisma schema and migrations for database consistency.
- Zod schemas for validation.
- Server actions for controlled authenticated mutations.
- Reusable UI components for consistent interface behavior.
- GitHub Actions to catch type, lint, and build issues.
- Vercel production deployment with environment variables managed outside the repository.

## 13. UX Decisions

The UX is designed around realistic hiring workflows:

- Public pages focus on discovery and evaluation.
- Candidate flows keep application submission simple and direct.
- Employer flows expose practical actions such as draft, publish, close, edit, delete, and applicant review.
- Empty states and pagination improve usability when data changes.
- Dashboards separate candidate and employer responsibilities.
- Forms are organized around the information each user type naturally needs.

## 14. Security Considerations

- Secrets are stored in local `.env` files and Vercel environment variables, not committed to GitHub.
- `.env.example` contains placeholders only.
- Protected dashboard routes require authentication.
- Role-aware flows separate candidate and employer behavior.
- Database writes are handled through server actions.
- `.vercelignore` prevents local environment files from being uploaded during CLI deployments.

## 15. Future Improvements

The project is structured so it can be extended with:

- Resume file uploads with storage integration.
- Email notifications for application status updates.
- Saved jobs for candidates.
- Employer analytics dashboard.
- Advanced search recommendations.
- End-to-end test coverage for key workflows.
- Custom domain and branded production deployment.

## 16. Final Submission Summary

HireFlow satisfies the assessment requirements by providing a functional job board, GitHub repository, CI workflow, Vercel deployment, and complete AI-generated documentation.

Submission links:

- GitHub Repository: https://github.com/Shyam787/hire-flow
- Vercel Demo: https://hire-flow-kappa-lovat.vercel.app
- Documentation: https://github.com/Shyam787/hire-flow/blob/main/docs/AI_GENERATED_DOCUMENTATION.md
