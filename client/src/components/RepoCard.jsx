import { useState } from "react";

function RepoCard({ repo }) {
  const [expanded, setExpanded] =
    useState(false);

  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>

      <p>
        {repo.description ||
          "No description"}
      </p>

      <div className="repo-info">
        <span>
          {repo.language || "Unknown"}
        </span>

        <span>
          ⭐ {repo.stargazers_count}
        </span>
      </div>

      <p>
        Updated:
        {" "}
        {new Date(
          repo.updated_at
        ).toLocaleDateString()}
      </p>

      <button
        onClick={() =>
          setExpanded(!expanded)
        }
      >
        {expanded
          ? "Hide Details"
          : "Show Details"}
      </button>

      {expanded && (
        <div className="repo-details">
          <p>
            Open Issues:
            {repo.open_issues_count}
          </p>

          <p>
            Default Branch:
            {repo.default_branch}
          </p>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View Repository
          </a>
        </div>
      )}
    </div>
  );
}

export default RepoCard;

