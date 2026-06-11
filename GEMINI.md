# Vicious Offline — Gemini CLI Context

## Project Overview
A local-first, AI-powered text and code workspace built with Next.js 15 (App Router).
No backend, no accounts — all storage is browser localStorage.
AI features run via Google Genkit + Gemini 2.5 Flash.

## Stack
- **Framework**: Next.js 15, App Router, TypeScript
- **AI**: Google Genkit, Gemini 2.5 Flash (`gemini-2.5-flash`)
- **UI**: Tailwind CSS, shadcn/ui, Lucide icons
- **Storage**: Browser localStorage only (no database)
- **Package manager**: npm

## Project Structure
```
src/
  app/             # Next.js App Router pages and layout
  components/      # React components
    ui/            # shadcn/ui primitives
  ai/
    flows/         # Genkit AI flows (summarize, explain, detect language)
  hooks/           # Custom React hooks
  lib/             # Types and utilities
```

## Key Files
- `src/components/vicious-offline-app.tsx` — root app state, document management
- `src/components/workspace-editor.tsx` — main editor surface
- `src/components/app-sidebar.tsx` — document list / snapshot panel
- `src/components/floating-controls.tsx` — AI assistant + export controls
- `src/ai/flows/` — all Genkit AI flows
- `src/lib/types.ts` — shared TypeScript types

## AI Flows
| Flow | File | Purpose |
|---|---|---|
| Summarize | `summarize-selected-notes-flow.ts` | Summarizes selected text or full doc |
| Explain | `explain-code-snippet.ts` | Explains code logic in plain English |
| Detect Language | `auto-detect-language-flow.ts` | Classifies text/code language type |

## Environment
```
GEMINI_API_KEY=   # Required. Get at aistudio.google.com
```
Never commit `.env`. Use `.env.example` as the template.

## Common Commands
```bash
npm run dev          # Start dev server at localhost:9002
npm run build        # Production build
npm run typecheck    # TypeScript check (no emit)
npm run genkit:dev   # Start Genkit AI dev UI
git add -A && git commit -m "" && git push origin main
```

## Conventions
- All components are functional with hooks — no class components
- AI flows are called directly from components (no API routes)
- `uuid` is used for document IDs — always import from `uuid`, never inline
- Export format: `.txt` or `.md` only
- No external fonts loaded at runtime — all defined in `globals.css` via Google Fonts import

## Style
- Background: Deep Obsidian `#0B0B13`
- Primary: Electric Periwinkle `#9494FF`
- Accent: Cool Azure `#7EB1FF`
- Headline font: Space Grotesk
- Body font: Inter
- Code font: Source Code Pro
- Layout: single-column, floating bottom controls, minimal chrome

## Do Not Touch
- `.env` — never commit, never log
- `localStorage` keys — changing these breaks existing user data
- shadcn/ui component internals in `src/components/ui/`
