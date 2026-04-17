import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { playChord, playProgression, playScale } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);

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

  const playableLabel =
    favorites.length > 0 ? `${favorites.length} saved favorite${favorites.length === 1 ? "" : "s"}` : "No favorites saved";

  useEffect(() => {
    updateRoute("favorites", {
      title: "Favorites",
      subtitle: "Saved chords, scales, and progressions.",
      playableLabel,
      playableNoteSet: [],
      playCurrent: null,
      clear: clearFavorites,
    });
  }, [clearFavorites, playableLabel, updateRoute]);

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
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Saved Library</span>
            <h1 className="legacy-tool-panel__title">Favorites</h1>
            <p className="legacy-tool-panel__copy">
              Saved chords, scales, and progressions with legacy-compatible persistence and a denser
              library layout instead of generic source summary cards.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Saved <strong>{favorites.length}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Key <strong>{currentKey}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <button
            className="ghost-button"
            onClick={() => clearFavorites()}
            disabled={favorites.length === 0}
          >
            Clear All
          </button>
        </div>
      </article>

      {favorites.length === 0 ? (
        <article className="legacy-preview-panel">
          <span className="summary-label">No Favorites Yet</span>
          <h2>Start starring source-side cards</h2>
          <p>
            Chord types, scale libraries, and progressions now expose source favorites. Save a few
            items there and they will appear here immediately.
          </p>
        </article>
      ) : (
        groupedFavorites.map(([label, items]) => (
          <article className="legacy-tool-panel" key={label}>
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">{label}</span>
                <h2>{items.length} saved</h2>
              </div>
            </div>

            <div className="legacy-catalog-grid">
              {items.map((item) => (
                <article key={`${item.type}:${item.name}`} className="legacy-catalog-card favorite-item-card">
                  <div className="legacy-catalog-card__header">
                    <div>
                      <span className="legacy-catalog-card__eyebrow">{item.type}</span>
                      <h3 className="legacy-catalog-card__title">{item.name}</h3>
                    </div>
                    <FavoriteToggleButton item={item} />
                  </div>
                  <p className="legacy-catalog-card__subtitle">
                    {item.desc || item.style || item.region || item.family || "Saved musical reference."}
                  </p>
                  <div className="legacy-preview-panel__meta">
                    {item.keySignature ? <span className="legacy-preview-chip">{item.keySignature}</span> : null}
                    {item.type === "progression" && item.numerals?.length ? (
                      <span className="legacy-preview-chip">{item.numerals.join(" - ")}</span>
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
