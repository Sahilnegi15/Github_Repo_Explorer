function UserProfile({ user }) {
  if (!user) {
     return (
      <div className="profile-card">
      <h3>Profile</h3>
        <div className="profile-avatar"></div>

        <div className="stats">
          <span>Repositories</span>
          <span>Followers</span>
          <span>Following</span>
          <span>Location</span>
        </div>
      </div>
    );
  }

  return (
  
    <div className="profile-card">
    <h3>Profile </h3>
      <img
        src={user.avatar_url}
        alt={user.login}
      />

      <div className="profile-info">
        <h2>{user.name || user.login}</h2>

        {user.bio && (
          <p>{user.bio}</p>
        )}
      </div>

      <div className="stats">
        <span>
          Repos: {user.public_repos}
        </span>

        <span>
          Followers: {user.followers}
        </span>

        <span>
          Following: {user.following}
        </span>

        <span>
          {user.location ||
            "Location unknown"}
        </span>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        <u>View on GitHub</u>
      </a>
    </div>
    
  );
}

export default UserProfile;