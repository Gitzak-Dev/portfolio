# Stack Spacer — Developer Portfolio

A modern full-stack developer portfolio built to showcase my work in web development, mobile applications, AI automation and machine learning.

## Live Website

[View Stack Spacer Live](https://stackspacer.com)

## Project Preview

![Stack Spacer Portfolio Preview](./public/github-preview.png)

## About the Project

Stack Spacer is a responsive and animated developer portfolio designed to present my technical skills, services and development projects.

The website includes a secure contact-management system, interactive animations and a responsive user interface for desktop, tablet and mobile devices.

## Main Features

- Modern and responsive user interface
- Animated hero section
- Desktop and mobile navigation
- Active navigation highlighting on scroll
- Interactive service and expertise sections
- Contact form with backend API
- Secure administrator login
- Database-powered contact submissions
- Mobile, tablet and desktop compatibility
- Production deployment on a custom domain

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Framer Motion
- GSAP
- Three.js
- CSS

### Backend

- Next.js API Routes
- Node.js
- Prisma ORM
- SQLite
- Zod Validation

### Development and Deployment

- Git
- GitHub
- npm
- cPanel Node.js Hosting
- Custom Domain Deployment

## Getting Started

Clone the repository:

```bash
git clone git@github.com:Gitzak-Dev/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Create or update the database:

```bash
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

Open the project in your browser:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
SESSION_SECRET="your-secure-session-secret"
```

Never upload your real `.env` file, passwords or session secrets to GitHub.

## Project Structure

```text
app/          Application pages and API routes
components/   Reusable React components
data/         Portfolio and application data
lib/          Shared utilities and backend logic
prisma/       Prisma schema and database configuration
public/       Images, icons and public assets
```

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Security

Sensitive information is excluded using `.gitignore`.

The following files should never be committed:

```text
.env
.env.local
node_modules/
.next/
*.db
*.sqlite
*.log
```

## Author

**Muhammad Hani**

- Portfolio: [stackspacer.com](https://stackspacer.com)
- GitHub: [Gitzak-Dev](https://github.com/Gitzak-Dev)
- LinkedIn: Add your LinkedIn profile URL here

## License

This project is available under the MIT License.
