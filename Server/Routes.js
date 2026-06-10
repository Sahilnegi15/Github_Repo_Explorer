const express = require("express");
const router = express.Router();

const githubApi = require("./Service");
const cache = require("./Cache");

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const { page = 1 } = req.query;

  const cacheKey = `${username}-${page}`;

  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Serving from cache");

    return res.json(cachedData);
  }

  try {
    console.log("Fetching from GitHub API");

    const [userRes, repoRes] = await Promise.all([
      githubApi.get(`/users/${username}`),

      githubApi.get(
        `/users/${username}/repos`,
        {
          params: {
            page,
            per_page: 30,
          },
        }
      ),
    ]);

    const response = {
      user: {
        login: userRes.data.login,
        name: userRes.data.name,
        avatar_url: userRes.data.avatar_url,
        bio: userRes.data.bio,
        followers: userRes.data.followers,
        following: userRes.data.following,
        public_repos: userRes.data.public_repos,
        html_url: userRes.data.html_url,
        location: userRes.data.location,
      },

      repos: repoRes.data,
    };

    cache.set(cacheKey, response);

    return res.json(response);
  } catch (error) {
    console.error(error.message);

    if (!error.response) {
      return res.status(503).json({
        message: "Unable to reach GitHub",
      });
    }

    if (error.response.status === 404) {
      return res.status(404).json({
        message: "GitHub user not found",
      });
    }

    if (error.response.status === 403) {
      return res.status(429).json({
        message: "GitHub API rate limit exceeded",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;