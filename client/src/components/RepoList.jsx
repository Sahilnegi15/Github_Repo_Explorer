import RepoCard from "./RepoCard";

function RepoList({
  repos,
  sortBy,
  setSortBy,
  loadMore,
}) {
  if (repos.length === 0) return null;

  return (
    <>

      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
          />
        ))}
      </div>

      <button
        className="load-more"
        onClick={loadMore}
      >
        Load More
      </button>
    </>
  );
}

export default RepoList;