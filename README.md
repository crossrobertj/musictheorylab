🎵 Music Theory Lab

A source-first React + Vite rewrite of Music Theory Lab.

The repo now has two runnable entry points:

- `/`
  The new source app shell and ported React features.
- `/legacy.html`
  The standalone legacy app generated from `MusicTheoryLabORIGIN.html`, retained as a reference and compatibility build.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Use `http://localhost:5173/legacy.html` to open the standalone legacy build directly.

## Production build

```bash
npm run build
npm run preview
```

The legacy assets are re-extracted automatically before `dev` and `build`.

## Cloudflare Pages

This repo is ready to deploy as a static SPA on Cloudflare Pages.

Use these settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: current LTS is fine

The SPA fallback is handled by `public/_redirects`, which is copied into `dist/` during the Vite build:

```txt
/* /index.html 200
```

That allows deep links like `/app/chords` and `/app/world` to resolve correctly on Cloudflare Pages while still using `BrowserRouter`.

## Smoke test

After starting `npm run preview` or `npm run dev`, run:

```bash
npm run smoke
```

Override the target URL with `SMOKE_URL=http://127.0.0.1:5173/ npm run smoke`.

## Test suite

Run the unit and component test suite with:

```bash
npm run test:run
```

Generate a coverage report with:

```bash
npm run test:coverage
```

Current repo-wide coverage:
- `80.72%` statements
- `63.67%` branches
- `76.79%` functions
- `83.41%` lines

This covers:
- theory helper behavior
- finder analysis behavior
- versioned persistence and legacy migration
- Zustand store behavior
- generated instrument config helpers
- lazy route rendering in the source app
- learning-path progress state
- finder page interaction state
- songwriting draft persistence and template/prosody flows
- metronome preset/tick behavior
- drum-machine filter/grid behavior
- source service-worker registration behavior
- offline recovery for a cached source route in browser smoke

## Migration structure

- `MusicTheoryLabORIGIN.html`
  Legacy reference implementation. Keep behavior here stable while migrating.
- `MIGRATION_STATUS.md`
  Source-vs-legacy inventory and the next feature targets.
- `scripts/extract-legacy.mjs`
  Extracts legacy runtime artifacts, generated theory data, and `public/legacy.html`.
- `src/domain/generated/theory-data.ts`
  Generated source-of-truth exports for keys, instruments, scales, chord templates, and progressions.
- `src/domain/music.ts`
  Shared source-side music theory helpers used by the React features.
- `src/audio/`
  Source-side Web Audio playback helpers.
- `src/legacy/`
  Legacy compatibility artifacts retained during the migration.
- `src/app/`
  Source-first shell, routing, and app state.
- `src/features/`
  Ported React features.
- `public/legacy-sw.js`
  Compatibility shim that forwards old legacy registrations into the shared app service worker.
- `public/app-sw.js`
  Unified root-scoped service worker for both the source app and `legacy.html`.

## Ported source features

- `Diatonic Chords`
- `All Chord Types`
- `Chord Voicings`
- `Circle of Fifths`
- `Modal Interchange`
- `Chord Analyzer`
- `Advanced Harmony`
- `Modulation Lab`
- `Interval Calculator`
- `Key Distance`
- `Notation Writer`
- `Tablature Tool`
- `Instrument View`
- `Metronome`
- `Drum Machine`
- `Rhythmic Lab`
- `Ear Trainer`
- `Quiz`
- `Learning Paths`
- `Theory Guide`
- `Grimoire`
- `Favorites`
- `Mixing Guide`
- `Recording Guide`
- `Western & Blues`
- `World Scales`
- `Scale Builder`
- `Progressions`
- `Chord/Scale Finder`
- `Genre Explorer`
- `Mood Picker`
- `Phrasing Tool`
- `Progression Studio`
- `Songwriting Lab`
- `Microtonal Lab`
- `Custom Tuning`

The primary app surface is now source-side. `legacy.html` remains available as a reference and fallback build.

✨ Features

🎹 Interactive Instruments

Piano keyboard with note highlighting, chord/scale overlays, and arpeggio mode

Fretboard view supporting guitar, bass, ukulele, and custom tunings

Custom Tuning Builder — set open string pitches and fret count for any instrument

🎼 Harmony & Chords

Diatonic Chords — all 7 diatonic triads and seventh chords for any key

Chord Quality Library — every chord type from triads to 13th chords with interval formulas

Chord Analyzer — identify and analyze chord structures

Voicings — browse and play chord voicing variations

Modal Interchange — borrow chords from parallel modes

Chord/Scale Finder — select notes to identify matching chords and scales

🎵 Scales & Modes

Diatonic modes (Ionian through Locrian) and church modes

World music scales: Indian ragas, Arabic maqams, pentatonic variants, and more

Scale Builder for constructing custom interval patterns

Microtonal scale support

Grimoire — full scale and chord catalog mapped to the current key root

🔄 Progressions

Genre-organized common chord progressions (Pop, Rock, Jazz, R&B, EDM, etc.)

Mood-based progression browsing

Studio and phrasing context suggestions

Modulation and key-change calculator

🎧 Audio Engine

Web Audio API synthesis — no external audio files needed

Chord playback, scale playback, arpeggio mode

Full mobile support with iOS/Android audio unlock flow

Sound toggle and real-time audio state management

🥁 Rhythm & Timing

Metronome — tempo presets, time signatures, subdivision support

Drum Machine — 16-step grid sequencer with a generated pattern library covering multiple genres and styles

Rhythmic utilities and humanization controls

## Architecture notes

- Route-level feature chunks are lazy-loaded with `React.lazy`, so the entry bundle only ships the app shell and the current route.
- The note-set `Chord/Scale Finder` now runs heavy matching in a real Web Worker, with a main-thread fallback if worker startup fails.
- The source app and `legacy.html` now share a unified root-scoped service worker, so visited routes and static assets can recover offline from cache.
- Source-side state now persists through a shared versioned storage layer, so old raw payloads and legacy keys are rewritten into one consistent envelope format.
