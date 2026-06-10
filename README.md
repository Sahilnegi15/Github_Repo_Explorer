# GitHub Repo Explorer

A full-stack web application that allows users to search for any GitHub profile and explore their public repositories.

Built with **React.js**, **Node.js**, and **Express.js**, the application proxies GitHub API requests through a backend service, implements server-side caching, and provides repository sorting, pagination, and detailed repository insights.

---

## Features

### Core Features

* Search GitHub users by username
* Display user profile information:

  * Avatar
  * Name
  * Bio
  * Followers
  * Following
  * Public repository count
* Display public repositories:

  * Repository name
  * Description
  * Primary language
  * Star count
  * Last updated date
* Sort repositories by:

  * Stars
  * Name
  * Last updated
* Handle invalid usernames gracefully
* Handle network failures
* Handle GitHub API rate limits

### Additional Features

* Server-side caching (60-second TTL)
* Loading states during API requests
* Pagination / Load More functionality
* Expandable repository details

  * Open issues count
  * Default branch
* Recently searched users stored in localStorage

---

## Architecture

```text
React Frontend
       │
       ▼
Node.js / Express Backend
       │
       ▼
In-Memory Cache (60s)
       │
       ▼
GitHub REST API
```

### Why Proxy Through the Backend?

The frontend never communicates directly with GitHub.

Benefits:

1. Protect API credentials from being exposed in the browser.
2. Reduce GitHub API requests through server-side caching.
3. Centralize error handling and rate-limit management.

---

## Tech Stack

### Frontend

* React.js
* Axios
* Vite
* CSS

### Backend

* Node.js
* Express.js
* Axios
* Node Cache
* dotenv

### External API

* GitHub REST API

---

## Folder Structure

```text
github-repo-explorer/

├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── components/
│   └── package.json
│
├── server/
│   ├── app.js
│   ├── Routes.js
│   ├── Service.js
│   ├── Cache.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Get User Profile and Repositories

```http
GET /api/github/:username?page=1
```

#### Example

```http
GET /api/github/octocat?page=1
```

#### Response

```json
{
  "user": {
    "name": "The Octocat",
    "followers": 100,
    "following": 20,
    "public_repos": 10
  },
  "repos": []
}
```

---

## Caching Strategy

To reduce GitHub API usage and avoid rate limiting, the backend uses an in-memory cache.

### Cache Rules

* Cache duration: 60 seconds
* Cache key format:

```text
username-page
```

Example:

```text
octocat-1
octocat-2
```

### Flow

```text
Request
   │
   ▼
Check Cache
   │
 ┌─┴─────────┐
 │           │
Hit         Miss
 │           │
 ▼           ▼
Return     GitHub API
Cached     Request
Data          │
              ▼
         Store Cache
              │
              ▼
          Return Data
```

---

## Error Handling

### User Not Found

```json
{
  "message": "GitHub user not found"
}
```

### Rate Limit Exceeded

```json
{
  "message": "GitHub API rate limit exceeded"
}
```

### Network Error

```json
{
  "message": "Unable to reach GitHub"
}
```

### Server Error

```json
{
  "message": "Internal server error"
}
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-repo-explorer
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
GITHUB_TOKEN=your_github_personal_access_token
```

Start the server:

```bash
npm run dev
```

or

```bash
node app.js
```

Backend runs at:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## GitHub API Token

Generate a Personal Access Token from GitHub:

https://github.com/settings/tokens

Store the token in:

```env
GITHUB_TOKEN=your_token_here
```

The token is never exposed to the client.

---

## Future Improvements

* Redis-based distributed caching
* Advanced filtering and searching
* Repository statistics dashboard
* GitHub GraphQL API integration
* Unit and integration tests
* Docker containerization
* CI/CD pipeline using GitHub Actions

---
