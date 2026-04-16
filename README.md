🎵 Music Theory Lab

A source-first React + Vite rewrite of Music Theory Lab.

The repo now has two runnable entry points:

- `/`
  The new source app shell and ported React features.
- `/legacy.html`
  The standalone legacy app generated from `MusicTheoryLabORIGIN.html` for the features that have not been ported yet.

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

## Smoke test

After starting `npm run preview` or `npm run dev`, run:

```bash
npm run smoke
```

Override the target URL with `SMOKE_URL=http://127.0.0.1:5173/ npm run smoke`.

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
  Static service worker adapter used by the extracted runtime under Vite.

## Ported source features

- `Diatonic Chords`
- `All Chord Types`
- `Chord Voicings`
- `Circle of Fifths`
- `Interval Calculator`
- `Key Distance`
- `Instrument View`
- `Metronome`
- `Drum Machine`
- `Ear Trainer`
- `Quiz`
- `Western & Blues`
- `World Scales`
- `Progressions`
- `Chord/Scale Finder`

Unported tools still work through `legacy.html`, and the source sidebar deep-links into the correct legacy view.

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
