/* =====================================================
   GITHUB REPOSITORIES
   Author: Dipayan Mahato Portfolio
===================================================== */

const GITHUB_USERNAME = "dipayan3203";
const MAX_REPOSITORIES = 6;

/* =====================================================
   LOAD REPOSITORIES
===================================================== */

async function loadGithubProjects() {

    const container = document.getElementById("github-projects");

    if (!container) return;

    container.innerHTML =
        '<div class="loading">Loading GitHub repositories...</div>';

    try {

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${MAX_REPOSITORIES}`
        );

        if (!response.ok) {

            throw new Error("Unable to fetch GitHub repositories.");

        }

        const repositories = await response.json();

        container.innerHTML = "";

        repositories.forEach(repo => {

            container.appendChild(createRepositoryCard(repo));

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="github-card">
                <h3>Unable to load repositories</h3>
                <p>Please try again later.</p>
            </div>
        `;

    }

}

/* =====================================================
   REPOSITORY CARD
===================================================== */

function createRepositoryCard(repo) {

    const card = document.createElement("article");

    card.className = "github-card reveal";

    const description =
        repo.description ||
        "No repository description available.";

    card.innerHTML = `

        <h4>${escapeHtml(repo.name)}</h4>

        <p>${escapeHtml(description)}</p>

        <div class="repo-meta">

            <span>
                💻 ${repo.language || "N/A"}
            </span>

            <span>
                ⭐ ${repo.stargazers_count}
            </span>

        </div>

        <div class="repo-meta" style="margin-top:12px;">

            <span>
                🍴 ${repo.forks_count}
            </span>

            <span>
                👁 ${repo.watchers_count}
            </span>

        </div>

        <div style="margin-top:22px;">

            <a
                href="${repo.html_url}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
            >
                View Repository
            </a>

        </div>

    `;

    return card;

}

/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(text) {

    if (!text) return "";

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

/* =====================================================
   OPTIONAL: FEATURED REPOSITORIES
===================================================== */

async function loadFeaturedRepositories(names = []) {

    if (!Array.isArray(names) || names.length === 0) {

        return;

    }

    const requests = names.map(name =>

        fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${name}`
        ).then(response => {

            if (!response.ok) {

                return null;

            }

            return response.json();

        })

    );

    try {

        return await Promise.all(requests);

    } catch (error) {

        console.error(error);

        return [];

    }

}

/* =====================================================
   GITHUB PROFILE
===================================================== */

async function loadGithubProfile() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`
        );

        if (!response.ok) {

            return;

        }

        const profile = await response.json();

        const profileName = document.getElementById("github-name");
        const followers = document.getElementById("github-followers");
        const following = document.getElementById("github-following");
        const repositories = document.getElementById("github-repositories");

        if (profileName)
            profileName.textContent = profile.name;

        if (followers)
            followers.textContent = profile.followers;

        if (following)
            following.textContent = profile.following;

        if (repositories)
            repositories.textContent = profile.public_repos;

    } catch (error) {

        console.error(error);

    }

}

/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadGithubProjects();

    loadGithubProfile();

});
