<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Acomo — Project Coding Standards

> These rules apply to all AI agents and contributors working on this codebase.
> When in doubt, follow these conventions — do not improvise.

---

## 1. Architecture: Atomic Design

This project strictly follows **Atomic Design**. Every UI component must live in the correct layer.

```
src/
├── components/
│   ├── atoms/        ← Smallest, fully generic, zero business logic
│   ├── molecules/    ← Compose 2+ atoms, minimal logic allowed
│   ├── organisms/    ← Full UI sections, may fetch data from constants/context
│   ├── templates/    ← Page layout, composes organisms, zero logic
│   └── (index.ts per folder — barrel exports)
├── app/              ← Next.js App Router pages & layouts ONLY
├── constants/        ← Static data arrays and config values
├── lib/              ← Pure utility functions (no React)
└── types/            ← Shared TypeScript interfaces and types
```

### Layer Rules

| Layer | Can import from | Cannot import from |
|---|---|---|
| `atoms` | `lib`, `types` | molecules, organisms, templates, app |
| `molecules` | `atoms`, `lib`, `types`, `constants` | organisms, templates, app |
| `organisms` | `molecules`, `atoms`, `lib`, `types`, `constants` | templates, app |
| `templates` | `organisms`, `molecules`, `atoms`, `lib`, `types` | app |
| `app` (pages) | `templates`, everything above | — |

> **Never import upward.** Atoms must not import molecules. Molecules must not import organisms.

---

## 2. Barrel Exports (index.ts) — MANDATORY

Every component folder **must** have an `index.ts` that re-exports all its members.

```ts
// ✅ src/components/atoms/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Container } from './Container';
export type { ContainerProps } from './Container';
```

### Import Rule

Always import from the **barrel**, never from the file directly.

```ts
// ✅ Correct
import { Button, Input } from '@/components/atoms';
import { FaqItem } from '@/components/molecules';
import { Hero, Footer } from '@/components/organisms';

// ❌ Wrong — do not import from individual files
import { Button } from '@/components/atoms/Button';
import { Hero } from '@/components/organisms/Hero';
```

---

## 3. Atoms — Rules

Atoms are **generic, reusable, and stateless** building blocks.

### ✅ Must Do
- Use `forwardRef` for all interactive elements (`input`, `button`, `textarea`, etc.)
- Always set `displayName` after `forwardRef`
- Export the component **and** its props interface
- Accept and spread `className` using the `cn()` utility
- Be fully context-agnostic — no hardcoded business content

```tsx
// ✅ Correct atom
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn('...base styles...', className)} {...props} />
  )
);
Input.displayName = 'Input';
```

### ❌ Must Not Do
- Hardcode `type`, `placeholder`, or any other semantic attribute
- Contain `useState`, `useEffect`, or any logic
- Import from `constants/` or `types/content.ts`
- Render business-specific text or icons

```tsx
// ❌ Wrong — type hardcoded in atom
<input type="email" placeholder="Enter your email" />

// ✅ Correct — consumer (molecule) specifies the type
// In EmailSubscription.tsx:
<Input type="email" placeholder="Enter your email" />
```

---

## 4. TypeScript — Rules

- **Strict mode is on** — never use `any`, `@ts-ignore`, or type assertions (`as`) without justification
- All shared data interfaces go in `src/types/`
- Always import types with `import type { ... }` when only used for type annotation

```ts
// ✅ Correct — shared type in src/types/content.ts
export interface FaqItem {
  id: string;
  title: string;
  content: string;
  defaultOpen?: boolean;
}

// ✅ Correct — import type in constants
import type { FaqItem } from '@/types/content';
```

---

## 5. List Rendering — Stable Keys

Never use `index` as a React `key`. Always use a **stable, unique string ID**.

```tsx
// ❌ Wrong — index as key
{FAQ_DATA.map((faq, index) => <FaqItem key={index} ... />)}

// ✅ Correct — stable string id
{FAQ_DATA.map((faq) => <FaqItem key={faq.id} ... />)}
```

All data arrays in `src/constants/` **must** include an `id: string` field.

---

## 6. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component files | PascalCase | `Button.tsx`, `FaqItem.tsx` |
| Component names | PascalCase | `export const Button` |
| Barrel files | lowercase | `index.ts` |
| Type files | lowercase | `content.ts` |
| Constant files | lowercase | `content.ts` |
| Exported constants | SCREAMING_SNAKE_CASE | `FAQ_DATA`, `FOOTER_LINKS` |
| Utility functions | camelCase | `cn()`, `formatDate()` |
| Interfaces / Types | PascalCase | `FaqItem`, `ButtonProps` |
| CSS variables | kebab-case | `--color-background` |

---

## 7. Utility: `cn()`

Always use `cn()` from `@/lib/utils` when merging Tailwind classes. Never use string concatenation or template literals for class merging.

```ts
// ✅ Correct
className={cn('base-classes', className)}

// ❌ Wrong
className={`base-classes ${className}`}
```

---

## 8. `"use client"` Directive

Only add `"use client"` when the component **actually** needs it:
- Uses `useState`, `useEffect`, or other React hooks
- Attaches browser event listeners
- Uses browser-only APIs

```tsx
// ✅ Needs "use client" — uses useState
"use client";
export const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  ...
};

// ✅ No "use client" needed — purely presentational
export const Hero = () => <section>...</section>;
```

---

## 9. Static Assets

All project assets live in `public/assets/`. Do not place project files directly in `public/` root.

```
public/
└── assets/
    ├── icon.svg
    ├── icon-row.svg
    ├── image-1.png
    └── union.svg
```

Reference assets with absolute paths from root: `src="/assets/icon.svg"`

---

## 10. What NOT to Add (Unless Explicitly Needed)

Do not prematurely add the following — violates YAGNI:

- `src/hooks/` — only when custom hooks exist
- `src/services/` or `src/api/` — only when actual API calls exist
- Top-level `src/components/index.ts` barrel — only for very large projects
- Storybook — only when a design system with multiple consumers is needed
- `src/store/` (Redux/Zustand) — only when global state is actually needed

