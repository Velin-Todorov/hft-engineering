# HFT Engineering

A technical blog platform focused on High-Frequency Trading systems, lock-free programming, and microsecond-level optimizations. Built with Next.js, TypeScript, Supabase, and React Query.

## Features

- 📚 Article management system with markdown support
- 🏷️ Category filtering and tagging
- 📄 Syntax-highlighted code blocks with copy functionality
- 🔍 Article search and pagination
- 🎨 Modern dark theme UI
- ⚡ Optimized for performance with React Query caching
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with syntax highlighting
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hft-engineering
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── article/[slug]/    # Dynamic article pages
│   ├── components/        # React components
│   ├── contexts/          # React context providers
│   ├── db/               # Database queries and hooks
│   ├── lib/              # Utility libraries (Supabase, React Query)
│   ├── types/            # TypeScript type definitions
│   └── common/           # Shared utilities
├── components/ui/        # Reusable UI components
├── supabase/            # Supabase configuration and migrations
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Database Schema

The application uses Supabase with the following main tables:
- `article` - Stores article content, metadata, and relationships
- `author` - Author information
- `category` - Article categories

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.
