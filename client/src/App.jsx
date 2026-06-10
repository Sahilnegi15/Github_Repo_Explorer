import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import RecentSearches from "./components/RecentSearches";
import UserProfile from "./components/UserProfile";
import RepoList from "./components/RepoList";

import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("stars");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    setRecentSearches(saved);
  }, []);
  
  useEffect(() => {
  const timer = setTimeout(() => {
    fetchSuggestions(username);
  }, 400);

  return () => clearTimeout(timer);
}, [username]);


  const saveRecentSearch = (name) => {
    const updated = [
      name,
      ...recentSearches.filter((item) => item !== name),
    ].slice(0, 5);

    setRecentSearches(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  const removeRecentSearch = (name) => {
    const updated = recentSearches.filter(
      (item) => item !== name
    );

    setRecentSearches(updated);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  const fetchGithubData = async (
    searchUser,
    currentPage = 1,
    append = false
  ) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API_URL}/api/github/${searchUser}?page=${currentPage}`
      );

      setUser(res.data.user);

      if (append) {
        setRepos((prev) => [...prev, ...res.data.repos]);
      } else {
        setRepos(res.data.repos);
      }

      saveRecentSearch(searchUser);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("GitHub user not found.");
      } else if (err.response?.status === 429) {
        setError("GitHub rate limit exceeded.");
      } else {
        setError("Something went wrong.");
      }

      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
  if (query.trim().length < 2) {
    setSuggestions([]);
    return;
  }

  try {
    const res = await axios.get(
      `${API_URL}/api/github/search/${query}`
    );

    setSuggestions(res.data);
  } catch (error) {
    console.error(error);
  }
};

  const handleSearch = () => {
  if (!username.trim()) return;

  setSuggestions([]); 

  setPage(1);
  fetchGithubData(username, 1);
};

  const loadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);

    fetchGithubData(username, nextPage, true);
  };

  const sortedRepos = useMemo(() => {
    const sorted = [...repos];

    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      case "updated":
        return sorted.sort(
          (a, b) =>
            new Date(b.updated_at) -
            new Date(a.updated_at)
        );

      default:
        return sorted.sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count
        );
    }
  }, [repos, sortBy]);

  return (
  <div className="app-container">

    {/* Header */}
    <header className="header">
      <div className="logo-block">
        <span className="github-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.429.37.81 1.096.81 2.212 0 1.596-.015 2.884-.015 3.276 0 .32.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </span>
        <h2>GitHub Repo Explorer</h2>
      </div>
    </header>

    {/* Search Row */}
    <div className="top-row">
      <div className="search-section">
        <SearchBar
  username={username}
  setUsername={setUsername}
  handleSearch={handleSearch}
  suggestions={suggestions}
  setSuggestions={setSuggestions}
  
/>
      </div>

      <div className="recent-section">
        <RecentSearches
          recentSearches={recentSearches}
          fetchGithubData={fetchGithubData}
          setUsername={setUsername}
          removeRecentSearch={removeRecentSearch}
        />
      </div>
    </div>

    {/* Main Content */}
    <div className="content-layout">

      {/* Left Sidebar */}
      <aside className="sidebar">
         
       <UserProfile user={user} />
      </aside>

      {/* Right Content */}
      <main className="repo-section">
       <div className = "repo">
        <h2>Repositories :</h2>
       </div>
        <div className="sort-container">
          <label>Sort By:</label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="stars">Stars</option>
            <option value="name">Name</option>
            <option value="updated">
              Last Updated
            </option>
          </select>
        </div>

        {loading && (
          <div className="loading">
            Loading...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !error && sortedRepos.length === 0 && (
          <div className="empty-state">
            No data to display
          </div>
        )}

        {repos.length > 0 && (
  <RepoList
    repos={sortedRepos}
    loadMore={loadMore}
  />
)}

      </main>

    </div>
  </div>
);
}

export default App;