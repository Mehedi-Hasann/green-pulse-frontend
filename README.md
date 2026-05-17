# Green Pulse Frontend

Green Pulse is a modern web application designed to manage challenges, submissions, members, and projects. This repository contains the frontend application built with Next.js, providing a fast, responsive, and interactive user experience for both public users, members, and administrators.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) & [React Query](https://tanstack.com/query/latest)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## ✨ Features

- **Public Views:** Explore projects and login.
- **Member Dashboard:** Track points, view active challenges, and submit project URLs.
- **Admin Dashboard:** Comprehensive control panel with analytics (Recharts), member management, challenge creation, and submission reviews.
- **Responsive Design:** Optimized for all devices using Tailwind CSS.
- **Dynamic Routing:** Centralized data store and dynamic pages for projects and challenges.
- **Secure Authentication:** JWT-based authentication flow.

## ⚙️ Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd green-pulse-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Environment Variables

Create a `.env` or `.env.local` file in the root directory based on the `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```
*(Note: Change the URL to your production backend API when deploying.)*

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router (Public, Member, Admin routes)
│   ├── components/     # Reusable UI components & modules
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── store/          # Zustand state management
├── .env.example        # Environment variables template
├── tailwind.config.ts  # Tailwind CSS configuration
└── package.json        # Project metadata and dependencies
```

## 🚀 Deployment

This application is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project in Vercel.
3. Add the `NEXT_PUBLIC_API_URL` environment variable.
4. Deploy!

## 🔗 Related Repositories
- **Backend:** [Link to Backend Repo] (Replace with actual link if available)
