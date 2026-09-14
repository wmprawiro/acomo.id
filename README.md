This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI Agent Context Generation

This project utilizes both **Repomix** and **Graphify** to easily provide complete codebase context to AI agents (like Claude, Cursor, Windsurf, or Gemini).

### 1. Repomix
Repomix bundles your entire codebase into a single AI-friendly XML/Markdown file.
- **Command:** `npx repomix`
- **Output:** `repomix-output.xml` (or `.md`)
- **Usage:** Drag and drop the output file into your AI chat to give it instant knowledge of all project files, ignoring `node_modules` and `.next`.
- **Config:** See `repomix.config.json`

### 2. Graphify
Graphify generates a visual or text-based dependency graph and repository map, allowing AI agents to understand how components and files relate to each other without reading every single line of code.
- **Output Directory:** `graphify-out/`
- **Usage:** Provide the graph summaries to your AI agent for architectural planning and impact analysis before starting a large refactor.
