function SearchBar({
  username,
  setUsername,
  handleSearch,
}) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" && handleSearch()
        }
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;