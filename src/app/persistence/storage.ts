export interface PersistedEnvelope<T> {
  version: number;
  data: T;
}

export interface LegacyPersistenceSource<T> {
  key: string;
  parse: (value: unknown) => T | null;
}

interface LoadPersistedStateOptions<T> {
  key: string;
  version: number;
  defaultValue: T;
  parse: (value: unknown) => T | null;
  migrations?: Partial<Record<number, (value: unknown) => unknown | null>>;
  legacySources?: LegacyPersistenceSource<T>[];
}

interface ResolvedPersistedState<T> {
  value: T;
  shouldRewrite: boolean;
}

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson(key: string): unknown | null {
  if (!hasStorage()) return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

function isEnvelope(value: unknown): value is PersistedEnvelope<unknown> {
  return Boolean(
    value &&
      typeof value === "object" &&
      "version" in value &&
      typeof (value as { version: unknown }).version === "number" &&
      "data" in value,
  );
}

function resolveEnvelopeValue<T>(
  rawValue: unknown,
  version: number,
  parse: (value: unknown) => T | null,
  migrations: Partial<Record<number, (value: unknown) => unknown | null>>,
): ResolvedPersistedState<T> | null {
  if (!isEnvelope(rawValue)) {
    const parsed = parse(rawValue);
    return parsed ? { value: parsed, shouldRewrite: true } : null;
  }

  let currentVersion = rawValue.version;
  let currentValue = rawValue.data;
  let shouldRewrite = false;

  while (currentVersion < version) {
    const migrate = migrations[currentVersion];
    if (!migrate) return null;
    const migrated = migrate(currentValue);
    if (migrated == null) return null;
    currentValue = migrated;
    currentVersion += 1;
    shouldRewrite = true;
  }

  if (currentVersion !== version) return null;

  const parsed = parse(currentValue);
  return parsed ? { value: parsed, shouldRewrite } : null;
}

export function persistVersionedState<T>(key: string, version: number, value: T) {
  if (!hasStorage()) return;

  try {
    const payload: PersistedEnvelope<T> = { version, data: value };
    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Ignore storage failures and keep the app interactive.
  }
}

export function clearPersistedState(key: string) {
  if (!hasStorage()) return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

export function loadVersionedState<T>({
  key,
  version,
  defaultValue,
  parse,
  migrations = {},
  legacySources = [],
}: LoadPersistedStateOptions<T>): T {
  if (!hasStorage()) return defaultValue;

  const sourceValue = readJson(key);
  const resolved = sourceValue == null ? null : resolveEnvelopeValue(sourceValue, version, parse, migrations);

  if (resolved) {
    if (resolved.shouldRewrite) {
      persistVersionedState(key, version, resolved.value);
    }
    return resolved.value;
  }

  for (const legacySource of legacySources) {
    const legacyValue = readJson(legacySource.key);
    if (legacyValue == null) continue;

    const parsed = legacySource.parse(legacyValue);
    if (!parsed) continue;

    persistVersionedState(key, version, parsed);
    return parsed;
  }

  return defaultValue;
}
