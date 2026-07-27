/* ==========================================================
   GitHub Repositories
   Dipayan Mahato
========================================================== */

const GITHUB_USERNAME = "dipayan3203";
const REPOSITORY_LIMIT = 3;

const container = document.getElementById("github-projects");

async function loadGitHubRepositories() {

    if (!container) return;

    container.innerHTML = `
        <div class="loading-repos">
            Loading latest repositories...
        </div>
    `;

    try {

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            throw new Error("GitHub API Error");
        }

        const repositories = await response.json();

        const filtered = repositories
            .filter(repo => !repo.fork)
            .sort(
                (a, b) =>
                    new Date(b.updated_at) -
                    new Date(a.updated_at)
            )
            .slice(0, REPOSITORY_LIMIT);

        if (!filtered.length) {

            container.innerHTML =
                "<p>No repositories found.</p>";

            return;
        }

        container.innerHTML = "";

        filtered.forEach(repo => {

            container.appendChild(createRepositoryCard(repo));

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="repo-card">
                <h3>Unable to load repositories</h3>
                <p>
                    GitHub API is currently unavailable
                    or rate limited.
                </p>

                <a href="https://github.com/${GITHUB_USERNAME}"
                   target="_blank">
                   Visit GitHub →
                </a>
            </div>
        `;

    }

}

function createRepositoryCard(repo) {

    const card = document.createElement("div");

    card.className = "repo-card";

    const language = repo.language || "Unknown";

    const updated =
        new Date(repo.updated_at).toLocaleDateString(
            "en-IN",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );

    card.innerHTML = `

        <h3>

            <i class="fab fa-github"></i>

            ${repo.name}

        </h3>

        <p>

            ${repo.description || "No description available."}

        </p>

        <div class="project-stack">

            <span>${language}</span>

            <span>${repo.visibility}</span>

        </div>

        <div class="repo-footer">

            <span>

                ⭐ ${repo.stargazers_count}

            </span>

            <span>

                🍴 ${repo.forks_count}

            </span>

        </div>

        <div class="repo-footer">

            <span>

                Updated ${updated}

            </span>

            <a
                href="${repo.html_url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                View Repository →
            </a>

        </div>

    `;

    return card;

}

loadGitHubRepositories();
