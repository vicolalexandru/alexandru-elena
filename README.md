# Alexandru & Elena — wedding site

Invitation website for Alexandru and Elena (June 27, 2027 · Lago Event Park, Chișinău).

## Local development

Requires [Node.js](https://nodejs.org/) (LTS recommended).

```sh
npm install
npm run dev
```

The dev server runs at [http://localhost:8080](http://localhost:8080).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest |

## Production site

Built for GitHub Pages with base path `/alexandru-elena/` (see `vite.config.ts`).

Live site: [https://vicolalexandru.github.io/alexandru-elena/](https://vicolalexandru.github.io/alexandru-elena/)

Deploy: `npm run build`, then push — GitHub Actions publishes `dist/` when configured.

## Stack

- Vite · React · TypeScript
- Tailwind CSS · shadcn/ui
- Framer Motion

## RSVP & integrations

See [RSVP_SETUP.md](./RSVP_SETUP.md) for Google Sheets RSVP wiring. See [INTERACTIVE_SETUP.md](./INTERACTIVE_SETUP.md) and [google-apps-script/](./google-apps-script/) for photo upload and other scripts.
