import { create } from "zustand";
import { loadVersionedState, persistVersionedState } from "../persistence/storage";

export type FavoriteItemType = "chord" | "scale" | "progression";

export interface FavoriteItem {
  type: FavoriteItemType;
  name: string;
  keySignature?: string;
  notes?: string[];
  chords?: string[][];
  numerals?: string[];
  route?: string;
  family?: string;
  region?: string;
  desc?: string;
  style?: string;
}

const SOURCE_STORAGE_KEY = "music-theory-lab-source-favorites-v1";
const STORAGE_VERSION = 1;
const LEGACY_STORAGE_KEY = "musicTheoryProFavoritesV2";

function favoriteId(item: Pick<FavoriteItem, "type" | "name">) {
  return `${item.type}:${item.name}`;
}

function normalizeFavoriteItem(item: FavoriteItem): FavoriteItem {
  return {
    ...item,
    notes: item.notes ? [...item.notes] : undefined,
    chords: item.chords ? item.chords.map((chord) => [...chord]) : undefined,
    numerals: item.numerals ? [...item.numerals] : undefined,
  };
}

function migrateLegacyFavorites(raw: unknown): FavoriteItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const candidate = item as Record<string, unknown>;
      if (typeof candidate.type !== "string" || typeof candidate.name !== "string") return [];

      const type = candidate.type;
      if (type !== "chord" && type !== "scale" && type !== "progression") return [];

      return [{
        type,
        name: candidate.name,
        keySignature: typeof candidate.keySignature === "string" ? candidate.keySignature : undefined,
        notes: Array.isArray(candidate.notes)
          ? candidate.notes.filter((note): note is string => typeof note === "string")
          : undefined,
        chords: Array.isArray(candidate.chords)
          ? candidate.chords.map((chord) =>
              Array.isArray(chord)
                ? chord.filter((note): note is string => typeof note === "string")
                : [],
            )
          : undefined,
        numerals: Array.isArray(candidate.numerals)
          ? candidate.numerals.filter((numeral): numeral is string => typeof numeral === "string")
          : undefined,
        route:
          typeof candidate.route === "string"
            ? candidate.route
            : type === "chord"
              ? "/app/allchords"
              : type === "scale"
                ? "/app/modes"
                : "/app/progressions",
        family: typeof candidate.family === "string" ? candidate.family : undefined,
        region: typeof candidate.region === "string" ? candidate.region : undefined,
        desc: typeof candidate.desc === "string" ? candidate.desc : undefined,
        style: typeof candidate.style === "string" ? candidate.style : undefined,
      } satisfies FavoriteItem];
    });
}

function loadFavorites(): FavoriteItem[] {
  return loadVersionedState({
    key: SOURCE_STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: [] as FavoriteItem[],
    parse: (value) => {
      if (!Array.isArray(value)) return null;
      return value.map((item) => normalizeFavoriteItem(item as FavoriteItem));
    },
    legacySources: [
      {
        key: LEGACY_STORAGE_KEY,
        parse: (value) => migrateLegacyFavorites(value),
      },
    ],
  });
}

function persistFavorites(items: FavoriteItem[]) {
  persistVersionedState(SOURCE_STORAGE_KEY, STORAGE_VERSION, items);
}

interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (item: Pick<FavoriteItem, "type" | "name">) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  clearFavorites: () => void;
  isFavorite: (item: Pick<FavoriteItem, "type" | "name">) => boolean;
}

const initialFavorites = loadFavorites();

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: initialFavorites,
  addFavorite: (item) => {
    const normalized = normalizeFavoriteItem(item);
    const next = [
      normalized,
      ...get().favorites.filter((favorite) => favoriteId(favorite) !== favoriteId(normalized)),
    ];
    set({ favorites: next });
    persistFavorites(next);
  },
  removeFavorite: (item) => {
    const next = get().favorites.filter((favorite) => favoriteId(favorite) !== favoriteId(item));
    set({ favorites: next });
    persistFavorites(next);
  },
  toggleFavorite: (item) => {
    if (get().isFavorite(item)) {
      get().removeFavorite(item);
      return;
    }
    get().addFavorite(item);
  },
  clearFavorites: () => {
    set({ favorites: [] });
    persistFavorites([]);
  },
  isFavorite: (item) =>
    get().favorites.some((favorite) => favoriteId(favorite) === favoriteId(item)),
}));
