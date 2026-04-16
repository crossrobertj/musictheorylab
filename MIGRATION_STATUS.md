# Migration Status

## Current state

- `/`
  Source-first React + Vite application.
- `/legacy.html`
  Generated standalone legacy application for unported tools.
- Shared source data is generated from `MusicTheoryLabORIGIN.html` into `src/domain/generated/theory-data.ts`.

## Ported source features

- `Diatonic Chords`
- `All Chord Types`
- `Circle of Fifths`
- `Interval Calculator`
- `Modal Interchange`
- `Chord Analyzer`
- `Advanced Harmony`
- `Modulation Lab`
- `Key Distance`
- `Instrument View`
- `Chord Voicings`
- `Metronome`
- `Drum Machine`
- `Rhythmic Lab`
- `Ear Trainer`
- `Quiz`
- `Learning Paths`
- `Theory Guide`
- `Grimoire`
- `Favorites`
- `Western & Blues`
- `World Scales`
- `Progressions`
- `Chord/Scale Finder`
- `Genre Explorer`
- `Mood Picker`
- `Scale Builder`
- `Phrasing Tool`
- `Progression Studio`
- `Songwriting Lab`
- `Notation Writer`
- `Tablature Tool`
- `Microtonal Lab`
- `Custom Tuning`
- `Mixing Guide`
- `Recording Guide`

## Remaining legacy-only surfaces

- No major feature routes remain legacy-only.
- `legacy.html` is retained as a reference build and compatibility fallback while the source app gains deeper tests, worker extraction, and offline support.

## Verification status

- Coverage reporting is wired through `npm run test:coverage`.
- Current automated coverage is `80.72%` statements, `63.67%` branches, `76.79%` functions, and `83.41%` lines.
- Current automated coverage includes domain helpers, finder analysis, versioned persistence, route rendering, store behavior, learning-path state, finder page state, songwriting flows, metronome and drum-machine state, service-worker registration, offline reload recovery, and browser smoke.
- Broader feature coverage is still useful, but the test suite is now materially beyond the earlier targeted baseline.

## Migration rule

- New source routes should become the default path when they exist.
- Legacy routes should remain reachable through `legacy.html` until parity is good enough to remove them.
- Do not expand `MusicTheoryLabORIGIN.html` further unless a bug fix is required to keep the legacy fallback usable.
