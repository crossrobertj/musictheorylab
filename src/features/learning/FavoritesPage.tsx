import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { playChord, playProgression, playScale } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { type FavoriteItem, useFavoritesStore } from "../../app/store/useFavoritesStore";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { NoteBadgeList } from "../../components/NoteBadgeList";

function playFavorite(item: FavoriteItem) {
  if (item.type === "progression" && item.chords?.length) {
    playProgression(item.chords);
    return;
  }

  if (!item.notes?.length) return;
  if (item.type === "scale") {
    playScale(item.notes);
    return;
  }

  playChord(item.notes);
}

export function FavoritesPage() {
  const navigate = useNavigate();
  const currentKey = useAppStore((state) => state.currentKey);
  const setCurrentKey = useAppStore((state) => state.setCurrentKey);
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const groupedFavorites = useMemo(() => {
    const groups = new Map<string, FavoriteItem[]>();
    favorites.forEach((favorite) => {
      const label =
        favorite.type === "chord"
          ? "Chords"
          : favorite.type === "scale"
            ? "Scales"
            : "Progressions";
      const existing = groups.get(label) ?? [];
      existing.push(favorite);
      groups.set(label, existing);
    });
    return Array.from(groups.entries());
  }, [favorites]);

  function openFavorite(item: FavoriteItem) {
    if (item.keySignature) {
      setCurrentKey(item.keySignature);
    }
    if (item.route) {
      navigate(item.route);
    }
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Favorites</h1>
          <p>
            Saved chords, scales, and progressions now live in source-side persistence. This page
            also migrates the legacy favorites key so older saved items are not stranded.
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="ghost-button"
            onClick={() => clearFavorites()}
            disabled={favorites.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Saved Items</span>
          <h2>{favorites.length}</h2>
          <p>Favorites are deduplicated by item type and name, matching the legacy behavior.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Migrated</span>
          <h2>Legacy-Compatible</h2>
          <p>The source store reads the old `musicTheoryProFavoritesV2` data the first time it loads.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Current Key</span>
          <h2>{currentKey}</h2>
          <p>Opening a favorite restores its saved key when that information exists.</p>
        </article>
      </div>

      {favorites.length === 0 ? (
        <article className="detail-card">
          <span className="summary-label">No Favorites Yet</span>
          <h2>Start starring source-side cards</h2>
          <p>
            Chord types, scale libraries, and progressions now expose source favorites. Save a few
            items there and they will appear here immediately.
          </p>
        </article>
      ) : (
        groupedFavorites.map(([label, items]) => (
          <article className="detail-card" key={label}>
            <div className="detail-header">
              <div>
                <span className="summary-label">{label}</span>
                <h2>{items.length} saved</h2>
              </div>
            </div>

            <div className="feature-grid">
              {items.map((item) => (
                <article key={`${item.type}:${item.name}`} className="feature-card favorite-item-card">
                  <div className="feature-card-header">
                    <div>
                      <span className="card-tag">{item.type}</span>
                      <h3>{item.name}</h3>
                    </div>
                    <FavoriteToggleButton item={item} />
                  </div>
                  <p className="card-copy">
                    {item.desc || item.style || item.region || item.family || "Saved musical reference."}
                  </p>
                  <div className="info-chip-row">
                    {item.keySignature ? <span className="info-chip">{item.keySignature}</span> : null}
                    {item.type === "progression" && item.numerals?.length ? (
                      <span className="info-chip">{item.numerals.join(" - ")}</span>
                    ) : null}
                  </div>
                  {item.notes?.length ? (
                    <NoteBadgeList notes={item.notes} keySignature={item.keySignature || currentKey} />
                  ) : null}
                  <div className="feature-card-footer">
                    <button className="ghost-button" onClick={() => openFavorite(item)}>
                      Open
                    </button>
                    <button className="primary-button" onClick={() => playFavorite(item)}>
                      Play
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        ))
      )}
    </section>
  );
}
