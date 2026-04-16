import { type MouseEvent } from "react";
import { type FavoriteItem, useFavoritesStore } from "../app/store/useFavoritesStore";

interface FavoriteToggleButtonProps {
  item: FavoriteItem;
  className?: string;
}

export function FavoriteToggleButton({ item, className = "" }: FavoriteToggleButtonProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const active = isFavorite(item);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    toggleFavorite(item);
  }

  return (
    <button
      type="button"
      className={`favorite-toggle-button ${active ? "is-active" : ""} ${className}`.trim()}
      onClick={handleClick}
      title={active ? "Remove from favorites" : "Add to favorites"}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      {active ? "Saved" : "Save"}
    </button>
  );
}
