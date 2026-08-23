<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=28&duration=3000&pause=1000&color=0E7490&center=true&vCenter=true&width=600&lines=IQRA+VISTA;AI-Powered+Quran+Learning+Platform;The+Future+of+Islamic+Education" alt="IQRA VISTA" />
</p><p align="center">
  <b>An AI-powered digital school for personalized Qur'an learning, Tajweed, memorization, and Islamic education.</b>
</p><p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=nodedotjs" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs" />
  <img src="https://img.shields.io/badge/Turborepo-1.11-EF4444?logo=turborepo" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
</p>---

🌟 Vision

IQRA VISTA is an AI-powered digital school designed to make high-quality Qur'anic education accessible and personalized for learners worldwide.

The platform combines:

- 📖 Qur'an learning and memorization
- 🎙️ Tajweed and pronunciation assistance
- 🧠 AI-powered personalized learning
- 👨‍👩‍👧 Student, Parent, Teacher, and Admin dashboards
- 📊 Learning progress and analytics
- 🌍 Multilingual AI tutoring
- 🎓 Assessments and certificates
- 🤖 Specialized AI educational agents

«Religious Integrity: Qur'an content, Tajweed rules, and Islamic educational material should be based on verified references and reviewed by qualified scholars. AI is used as a learning assistant, not as an independent religious authority.»

---

🏗️ Architecture

IQRA VISTA is built as a scalable Turborepo monorepo. The platform separates user-facing applications, backend APIs, shared packages, and specialized AI services while keeping them in a single development workspace.

                              IQRA VISTA
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              Applications                  Services
                    │                           │
        ┌───────────┼───────────┐       ┌──────┴─────────┐
        │           │           │       │                │
      Web          API        Mobile    AI Agents    Speech Services
   Next.js       NestJS       Future       │
        │           │                    │
        │           ├────────────┐       │
        │           │            │       │
        │       PostgreSQL      Redis ◄──┘
        │           │            │
        └───────────┴────────────┴──────────────┐
                                                │
                                         Shared Packages
                                      UI • Types • Config
                                                │
                                         Infrastructure
                                  Docker • AWS • Cloudflare

Architecture Principles

- Monorepo: Turborepo + npm Workspaces
- Modular Backend: NestJS modules organized by domain
- Shared Packages: Reusable UI, types, and configuration
- AI Services: Specialized agents separated by responsibility
- Scalable Infrastructure: Docker and cloud-ready architecture
- Secure APIs: Authentication, authorization, validation, and rate limiting
- Database: PostgreSQL with Prisma ORM
- Caching & Queues: Redis and Bull

---

📁 Project Structure

The repository is organized into applications, shared packages, AI services, infrastructure, and documentation.

iqra-vista/
│
├── apps/
│   ├── web/                       # Next.js web application
│   │   ├── src/
│   │   │   ├── app/               # App Router / pages
│   │   │   ├── components/        # Reusable UI
│   │   │   ├── hooks/             # React hooks
│   │   │   └── stores/            # Zustand stores
│   │   └── public/
│   │
│   ├── api/                       # NestJS backend API
│   │   ├── src/
│   │   │   ├── modules/           # Domain modules
│   │   │   ├── database/          # Database configuration
│   │   │   └── main.ts             # API entry point
│   │   └── prisma/                # Prisma schema & migrations
│   │
│   └── mobile/                    # Future mobile application
│
├── packages/
│   ├── ui/                        # Shared UI components
│   ├── types/                     # Shared TypeScript types
│   ├── eslint-config/             # Shared ESLint configuration
│   └── typescript-config/         # Shared TypeScript configuration
│
├── services/
│   ├── ai-interview/              # Student admission & placement
│   ├── ai-assessment/             # Student assessment
│   ├── ai-teacher/                # Personalized teaching
│   ├── ai-pronunciation/          # Recitation analysis
│   ├── ai-personalization/        # Adaptive learning
│   ├── ai-parent-report/          # Parent progress reports
│   ├── ai-supervisor/             # Teaching & learning supervision
│   ├── ai-principal/              # Institutional intelligence
│   ├── ai-finance/                # Finance automation
│   └── speech-recognition/        # Speech processing
│
├── infra/                         # Infrastructure configuration
├── docs/                          # Architecture & technical docs
├── scripts/                       # Automation scripts
│
├── .env.example                   # Environment template
├── docker-compose.yml             # Local infrastructure
├── turbo.json                     # Turborepo configuration
└── package.json                   # Root workspace configuration

---

🛠️ Tech Stack

Category| Technology
Monorepo| Turborepo, npm Workspaces
Frontend| Next.js, React, TypeScript, Tailwind CSS
UI / State| Framer Motion, Zustand, React Query
Backend| NestJS, Node.js, TypeScript
ORM| Prisma
Database| PostgreSQL
Cache / Queue| Redis, Bull
Authentication| Passport.js, JWT, bcrypt
AI / ML| OpenAI, Hugging Face, Speech Recognition
Payments| Stripe
Storage| AWS S3
Email| Nodemailer / SMTP
Infrastructure| Docker, Docker Compose, Terraform
Testing| Jest, Supertest, React Testing Library
API Documentation| Swagger / OpenAPI
CI/CD| GitHub Actions
Monitoring| Sentry, CloudWatch
CDN / DNS| Cloudflare

---

🤖 AI Agent System

AI is a core part of IQRA VISTA. Instead of relying on one general-purpose AI, the platform is designed around specialized agents, each responsible for a specific educational or operational function.

                         ┌──────────────────────┐
                         │     IQRA VISTA AI    │
                         │    Intelligence Hub  │
                         └──────────┬───────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
   🎓 Learning                  🕌 Quran                    🏫 School
    Agents                     Agents                     Agents
        │                           │                           │
   ┌────┴─────┐               ┌─────┴──────┐             ┌──────┴─────┐
   │           │               │            │             │            │
   ▼           ▼               ▼            ▼             ▼            ▼
Interview   Assessment      Teacher    Pronunciation   Supervisor   Principal
   │           │               │            │             │            │
   └───────────┴───────────────┴────────────┴─────────────┴────────────┘
                                    │
                                    ▼
                         Personalized Learning
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              Parent Reports    Multilingual      Finance
                                  Tutor

Core AI Agents

Agent| Responsibility
🎤 AI Interview Agent| Admission interviews and placement
📊 AI Assessment Agent| Evaluates learner proficiency
👨‍🏫 AI Teacher Agent| Personalized Qur'an, Tajweed, and Hifz teaching
🗣️ AI Pronunciation Agent| Recitation and pronunciation analysis
🧠 AI Personalization Agent| Creates adaptive learning paths
👨‍👩‍👧 AI Parent Report Agent| Generates learner progress reports
👁️ AI Supervisor Agent| Monitors learning and teaching quality
🏫 AI Principal Agent| Supports school-level operations
💳 AI Finance Agent| Billing and subscription workflows
🌍 AI Multilingual Tutor| Multilingual learner assistance

AI Design Philosophy

The AI layer is designed to assist education, not replace qualified teachers or scholars.

For religious content:

«Verified Qur'anic sources → Scholarly validation → AI-assisted delivery»

This ensures that AI-generated educational experiences remain grounded in reliable Islamic sources.
---

✨ Key Features

🧠 Personalized Learning

Adaptive learning paths based on student assessments and progress.

🎙️ Tajweed & Pronunciation

Audio-based recitation practice and pronunciation feedback.

📖 Hifz & Revision

Memorization progress, revision scheduling, and spaced repetition.

👨‍👩‍👧 Multi-Role Dashboards

Dedicated experiences for:

- Students
- Parents
- Teachers
- Administrators

📊 Progress Analytics

Learning performance, achievements, progress tracking, and reports.

💳 Payments

Subscription and payment management with payment-provider integration.

🌍 Multilingual Learning

AI-powered support for learners from different linguistic backgrounds.

🔐 Secure Authentication

JWT authentication and role-based access control.

☁️ Cloud Storage

AWS S3 support for audio and educational media.

📱 Responsive Design

Mobile-first interface designed for web and future mobile applications.

---

🚀 Getting Started

Prerequisites

- Node.js >= 18
- npm >= 9
- Docker & Docker Compose
- PostgreSQL
- Redis

Installation

git clone https://github.com/Maddyahamco00/iqra-vista.git

cd iqra-vista

npm install

Create your environment file:

cp .env.example .env

Then configure the required variables.

Environment Variables

Typical variables include:

DATABASE_URL=postgresql://postgres:password@localhost:5432/iqra_vista

REDIS_URL=redis://localhost:6379

JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

OPENAI_API_KEY=your-api-key

NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000

Additional variables may be required for storage, payments, email, and other external services.

«🔒 Never commit ".env" files or API keys to GitHub.»

---

🐳 Running Locally

Using Docker

npm run docker:up

Run migrations:

npm run db:migrate

Optional database seed:

npm run db:seed

Start the development environment:

npm run dev

Run Applications Individually

Backend:

cd apps/api
npm run start:dev

Frontend:

cd apps/web
npm run dev

Local URLs

Web:     http://localhost:3000
API:     http://localhost:3001
Swagger: http://localhost:3001/api/docs


---

🔄 Development Workflow

Format code:

npm run format

Lint:

npm run lint

Run tests:

npm run test

Build:

npm run build

Database:

npm run db:migrate
npm run db:generate
npm run db:seed

Engineering Principles

IQRA VISTA follows modern software engineering practices including:

- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Domain-Driven Design (DDD)
- Modular architecture
- Code reviews
- Automated testing

---

🧪 Testing

Area| Command| Framework
API| "npm run test"| Jest, Supertest
API E2E| "npm run test:e2e"| Jest
Web| "npm run test"| Jest, React Testing Library
Web Watch| "npm run test:watch"| Jest

---

🌍 Deployment

The planned production infrastructure includes:

                    Cloudflare
                        │
                        ▼
                     Vercel
                    Frontend
                        │
                        ▼
                 AWS Infrastructure
              ┌─────────┼─────────┐
              │         │         │
             ECS       RDS    ElastiCache
           Backend   Database      Redis
                        │
                        ▼
                       S3
                  Media Storage

Planned infrastructure includes:

- Vercel
- AWS ECS / Fargate
- AWS RDS
- AWS ElastiCache
- AWS S3
- Cloudflare CDN
- GitHub Actions
- Sentry
- CloudWatch

---

🤝 Contributing

Contributions are welcome.

git checkout -b feat/amazing-feature

git add .

git commit -m "feat: add amazing feature"

git push origin feat/amazing-feature

Then open a Pull Request.

Contribution Guidelines

- Follow the existing code style.
- Write tests for new functionality.
- Update documentation when necessary.
- Follow the project's architectural conventions.
- Never invent or modify Qur'an/Tajweed rules.
- Religious content must come from verified references.

---

📜 License

This project is licensed under the MIT License.

See the "LICENSE" (LICENSE) file for details.

---

🙏 Acknowledgments

- Qur'an Data: Tanzil.net and Quran.com
- Recitation & Tajweed References: Authenticated Qaris and established scholarly resources
- Islamic Curriculum: Qualified scholarly review
- Technology: Open-source and developer communities

---

<p align="center">
  <b>IQRA VISTA — Read. Learn. Grow. 🌙</b>
</p><p align="center">
  Built with ❤️ for the Ummah
</p>