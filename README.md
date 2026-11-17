# Veresies Training Center

Web app for guided mental-training products: trainings, focused programs and
practices. This is the first scaffold: design, pages and content, with no
backend yet.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What is here

| Path | What it holds |
| --- | --- |
| `src/app/globals.css` | Design tokens (colours, fonts) taken from the Canva mockups |
| `src/content/types.ts` | The generic content model: product, steps, blocks |
| `src/content/catalog.ts` | The pyramid of trainings, focused programs, practice categories, team |
| `src/content/stress-reset.ts` | Stress Reset. Activity 1 is fully converted; 2 to 15 are outlines |
| `src/lib/content.ts` | Data access. Pages read content only through these functions |
| `src/lib/mock-user.ts` | Placeholder user and progress |
| `src/components/BlockView.tsx` | Renders one content block |
| `src/components/tools/BodyScanTool.tsx` | The Body Scan form and history |
| `src/lib/user-data/body-scans.ts` | Saved scans, kept in the browser's localStorage for now |

## Not built yet

- The other interactive tools (Body Map, Context Map, Root Map, List of Changes, Response Map) and real progress
- A real backend behind `src/lib/content.ts` and `src/lib/user-data/`
- Login, purchase and timed unlocking
- Activities 2 to 15 of Stress Reset as blocks
- Translations, service worker, app icons, real images and videos

## If a page shows "Jest worker encountered ... child process exceptions"

Stop the dev server, delete the `.next` folder and run `npm run dev` again.
This happened once after a `git pull` while the server was running.

Built on Node 22; also confirmed working on Node 20.
