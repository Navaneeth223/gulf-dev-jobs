# Gulf Dev Jobs

Niche job board for Gulf-based and remote-friendly tech hiring. Employers pay to post. Candidates apply free.

Phase 1 (this repo state): Next.js 14 App Router, Tailwind, MongoDB/Mongoose, NextAuth (JWT, email/password + optional Google), landing + role-aware accounts.

## Local run

```bash
copy .env.example .env.local
```

Fill `MONGODB_URI` and `NEXTAUTH_SECRET`. Google OAuth is optional.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Register as candidate or employer, then open `/account`.

## Suggested commit message

```
Add Phase 1 foundation: auth, MongoDB, and niche landing.
```
