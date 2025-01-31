# Word Assassins 🎯

A modern game where friends play in real life and compete in social deduction and strategy.

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/) + [Prisma](https://www.prisma.io/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [React Query](https://tanstack.com/query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Date Handling**: [Luxon](https://moment.github.io/luxon/)
- **Validation**: [Zod](https://zod.dev/)

## 🚀 Quick Start

### Setup Instructions

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Fill in environment variables:

   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `DATABASE_URL`: Your database connection string
   - `DIRECT_URL`: Direct connection to your database

3. **Database Setup**

   ```bash
   yarn prisma migrate dev
   ```

4. **Run development server**

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser
