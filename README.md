# AAA Digital Membership Platform (Demo)

A polished demo of a member benefits platform built with Next.js 14, showcasing key user and admin experiences with mock data. This repo is presentation-ready for client review; production features (DB, auth, payments) can be added post-approval.

## Stack
- Next.js 14 (App Router), React 18
- Tailwind CSS 4 + shadcn/ui components
- Recharts (analytics), next-themes (dark mode)

## Demo Credentials
- Member: `member@test.com` / `password`
- Admin: `admin@test.com` / `password`

## Features (Mocked)
- Member portal: Membership status & renewal, Beneficiaries, Payments history, Claims submission, Reimbursements with countdown + redeem code dialog, Appeals, Documents management
- Admin portal: Member management (suspend/toggle), Claims processing (approve/reject + notes), Appeals decisions, Reports & Analytics, Configuration panel
- Global UX: Dark mode toggle, notifications panel, branded look and microcopy

## Screens
- `/` Landing
- `/login` and `/register`
- `/dashboard` (Member)
- `/admin` (Admin)

## Quick Start
```bash
npm i
npm run dev
```
- Visit http://localhost:3000
- Use the demo credentials above

## Roadmap (Post-approval)
- Auth & RBAC (NextAuth), 2FA, audit logs
- Database (Prisma + Postgres), API routes, storage (S3/Supabase)
- KYC pipeline with document verification
- Claims eligibility engine, notifications (email/SMS), scheduled reminders
- Payments & renewals (Stripe/Paystack), PDF receipts, late fees
- Real reporting with exports

## CI
- GitHub Actions workflow builds and lints on push and PR.

## License
Demo use only until client contract; final license TBD.
