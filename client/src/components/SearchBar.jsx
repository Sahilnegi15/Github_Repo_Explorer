function SearchBar({
  username,
  setUsername,
  handleSearch,
  suggestions,
  setSuggestions,
}) {
    const handleClear = () => {
  setUsername("");
  setUser(null);
  setRepos([]);
  setError("");
  setPage(1);
  setSuggestions([]);
};
  return (
    <div className="search-wrapper">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSearch()
          }
        />

        <button onClick={handleSearch}>
          Search
        </button>
          <button onClick={handleClear}>
  Clear
</button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="suggestion-item"
              onClick={() => {
                setUsername(user.login);
                setSuggestions([]);
              }}
            >
              <img
                src={user.avatar_url}
                alt={user.login}
              />

              <span>{user.login}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;