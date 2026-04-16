import { ALL_SCALES, CHORD_TEMPLATES } from "./generated/theory-data";
import { NOTES, buildChordFromRootAndQuality, getNotesFromIntervals, normalizeNote } from "./music";

export interface FinderChordMatch {
  name: string;
  desc: string;
  quality: string;
  root: string;
  notes: string[];
}

export interface FinderScaleMatch {
  name: string;
  region: string;
  score: number;
  notes: string[];
}

export function getUniqueNoteClasses(notes: string[]) {
  return [...new Set(notes.map((note) => normalizeNote(note).replace(/[0-9]/g, "")))];
}

function noteClassesToPitchClasses(noteClasses: string[]) {
  return [...new Set(noteClasses.map((noteClass) => NOTES.indexOf(normalizeNote(noteClass) as (typeof NOTES)[number])))]
    .filter((value) => value >= 0)
    .sort((left, right) => left - right);
}

export function findExactChordMatches(noteClasses: string[]) {
  const normalized = noteClassesToPitchClasses(noteClasses);
  const matches: FinderChordMatch[] = [];

  Object.entries(CHORD_TEMPLATES).forEach(([quality, template]) => {
    for (let rootIndex = 0; rootIndex < 12; rootIndex += 1) {
      const candidate = template.intervals
        .map((interval) => (rootIndex + interval) % 12)
        .sort((left, right) => left - right);

      if (JSON.stringify(candidate) === JSON.stringify(normalized)) {
        const root = NOTES[rootIndex];
        matches.push({
          name: `${root}${template.symbol}`,
          desc: template.desc,
          quality,
          root,
          notes: buildChordFromRootAndQuality(`${root}4`, quality).notes,
        });
      }
    }
  });

  return matches;
}

export function findMatchingScales(noteClasses: string[]) {
  const normalized = noteClassesToPitchClasses(noteClasses);
  const matches: FinderScaleMatch[] = [];

  Object.entries(ALL_SCALES).forEach(([scaleName, scale]) => {
    for (let rootIndex = 0; rootIndex < 12; rootIndex += 1) {
      const candidate = scale.intervals
        .map((interval) => (rootIndex + Math.floor(interval)) % 12)
        .sort((left, right) => left - right);
      const matchCount = normalized.filter((note) => candidate.includes(note)).length;

      if (matchCount === normalized.length && matchCount >= scale.intervals.length * 0.7) {
        const root = NOTES[rootIndex];
        matches.push({
          name: `${root} ${scaleName}`,
          region: scale.region,
          score: scale.intervals.length - matchCount,
          notes: getNotesFromIntervals(`${root}4`, scale.intervals),
        });
      }
    }
  });

  matches.sort((left, right) => left.score - right.score || left.name.localeCompare(right.name));
  return matches;
}

export function getCompatibleScalesForNoteClasses(noteClasses: string[], limit = 10) {
  const target = getUniqueNoteClasses(noteClasses);
  const candidates: FinderScaleMatch[] = [];

  Object.entries(ALL_SCALES).forEach(([scaleName, scale]) => {
    NOTES.forEach((root) => {
      const notes = getNotesFromIntervals(`${root}4`, scale.intervals);
      const candidateClasses = notes.map((note) => normalizeNote(note).replace(/[0-9]/g, ""));
      const candidateSet = new Set(candidateClasses);
      const coverage = target.filter((noteClass) => candidateSet.has(noteClass)).length;

      if (coverage === target.length) {
        candidates.push({
          name: `${root} ${scaleName}`,
          region: scale.region,
          score: candidateSet.size - coverage,
          notes,
        });
      }
    });
  });

  const unique: FinderScaleMatch[] = [];
  const seen = new Set<string>();
  candidates
    .sort((left, right) => left.score - right.score || left.name.localeCompare(right.name))
    .forEach((candidate) => {
      if (!seen.has(candidate.name)) {
        seen.add(candidate.name);
        unique.push(candidate);
      }
    });

  return unique.slice(0, limit);
}
