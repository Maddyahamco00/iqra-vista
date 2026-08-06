# IQRA VISTA Project Summary

## Overview
IQRA VISTA is an AI-powered personalized Quran learning and future education platform built as a monorepo. It combines a NestJS backend API, a Next.js web application, a mobile workspace, shared packages, and multiple AI-focused service packages.

## Repository Structure
- `apps/api` - Backend API using NestJS, Prisma, Bull queue, Redis, JWT auth, Swagger docs, Stripe, AWS S3, and email.
- `apps/web` - Frontend using Next.js 14, React 18, Tailwind CSS, React Query, Zustand, Recharts, and audio visualization.
- `apps/mobile` - Mobile application workspace (source present, package manifest not listed in workspace search).
- `packages` - Shared monorepo support packages, including ESLint config, shared type definitions, TypeScript configs, and UI components.
- `services` - AI and speech-related service packages: `ai-interview`, `ai-parent-report`, `ai-personalization`, `ai-principal`, `ai-pronunciation`, `ai-teacher`, and `speech-recognition`.
- `docs` - Contains documentation directories for API, architecture, and design.
- `infra` - Infrastructure support with Docker, Kubernetes, and Terraform scaffolding.

## Key Technologies
- Monorepo managed by `turbo` (TurboRepo)
- Backend: `NestJS`, `Prisma`, `Bull`, `Redis`, `Passport`, `JWT`, `Swagger`
- Frontend: `Next.js`, `React`, `Tailwind CSS`, `React Query`, `Zustand`, `Framer Motion`
- AI/Services: Dedicated service modules for AI interview, reporting, personalization, teacher/principal assistance, pronunciation, and speech recognition
- Dev tooling: `TypeScript`, `ESLint`, `Prettier`, `Jest`

## Notable Features
- AI agent modules for specialized education workflows
- Multi-role frontend paths for admin, parent, and student dashboards
- Backend modules for students, assessments, lessons, progress, payments, reports, and AI agents
- Security and performance middleware in the API: Helmet, compression, global validation pipes
- Swagger API documentation enabled in the backend

## Strengths
- Strong modular architecture with clear separation between apps, packages, and services
- Modern stack with cross-platform and AI-oriented capabilities
- Good foundation for scaling with infrastructure and service packages
- Uses best practices like shared types, centralized linting, and monorepo pipeline scripts

## Opportunities
- No root `README.md` or clear project onboarding file found in the workspace
- Documentation appears to exist under `docs/`, but a top-level entry point could improve usability
- Mobile workspace contents were not fully inspected, so mobile readiness is assumed but not verified

## Ratings
- Architecture: 4.5 / 5
- Tech Stack: 4.5 / 5
- Scalability: 4.0 / 5
- Documentation / Discoverability: 2.5 / 5
- Overall: 4.0 / 5

## Notes
- Root package scripts support `build`, `dev`, `lint`, `test`, `format`, and Prisma database commands.
- The backend API exposes Swagger docs at `/api/docs` and globally prefixes routes with `/api`.
- The frontend root layout handles query and auth providers plus toast notifications.

> Created `PROJECT_SUMMARY.md` at the repository root.
