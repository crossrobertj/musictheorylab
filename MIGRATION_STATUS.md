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
- `Key Distance`
- `Instrument View`
- `Chord Voicings`
- `Metronome`
- `Drum Machine`
- `Ear Trainer`
- `Quiz`
- `Western & Blues`
- `World Scales`
- `Progressions`
- `Chord/Scale Finder`

## In progress

- `Theory Guide`
  Best next learning target now that both ear training and quiz flows are source-side.

## Still missing from the source app

- `Modal Interchange`
- `Genre Explorer`
- `Mood Picker`
- `Theory Guide`
- `Favorites`
- `Scale Builder`
- `Chord Analyzer`
- `Grimoire`
- `Songwriting / studio / phrasing tools`
- `Microtonal and historical tuning UI`

## Shared infrastructure still missing

- Source-side worker for heavy chord/scale matching.
- Source-side persistence migration from legacy localStorage keys.
- Source-side service worker and offline strategy for the React app itself.
- Source-side tests for theory helpers and feature routes beyond smoke coverage.

## Migration rule

- New source routes should become the default path when they exist.
- Legacy routes should remain reachable through `legacy.html` until parity is good enough to remove them.
- Do not expand `MusicTheoryLabORIGIN.html` further unless a bug fix is required to keep the legacy fallback usable.
