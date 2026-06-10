import { useState } from "react";

function RecentSearches({
  recentSearches,
  fetchGithubData,
  setUsername,
  removeRecentSearch,
}) {
  const [open, setOpen] = useState(false);

  if (recentSearches.length === 0) return null;

  return (
    <div className="recent-dropdown">
      <button
        className="recent-btn"
        onClick={() => setOpen(!open)}
      >
        Recent Searches ▼
      </button>

      <div
        className={`recent-menu ${
          open ? "show" : ""
        }`}
      >
        {recentSearches.map((item) => (
          <div key={item} className="recent-item-row">
            <button
              className="recent-item-select"
              onClick={() => {
                setUsername(item);
                fetchGithubData(item);
                setOpen(false);
              }}
            >
              {item}
            </button>
            <button
              className="recent-item-delete"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeRecentSearch(item);
              }}
              aria-label={`Delete ${item}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;