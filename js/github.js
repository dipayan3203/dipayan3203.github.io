/**
 * github.js - GitHub API Integration
 * Fetches repositories from GitHub API and renders them
 */

const GITHUB_USERNAME = 'dipayan3203';
const REPO_GRID = document.getElementById('repo-grid');

/**
 * Fetch repositories from GitHub API
 * Falls back to local projects.json if API fails
 */
async function fetchGitHubRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    renderRepos(repos);
  } catch (error) {
    console.warn('GitHub API failed, using fallback data:', error);
    try {
      const fallbackResponse = await fetch('data/projects.json');
      if (!fallbackResponse.ok) throw new Error('Fallback data not found');
      const fallbackData = await fallbackResponse.json();
      renderRepos(fallbackData);
    } catch (fallbackError) {
      console.error('Fallback data failed:', fallbackError);
      REPO_GRID.innerHTML = `
        <div class="card" style="grid-column:1/-1;text-align:center;padding:2rem;">
          <i class="fas fa-exclamation-triangle" style="color:#c45a6b;font-size:2rem;"></i>
          <p style="margin-top:0.8rem;">Could not load repositories. Please try again later.</p>
        </div>
      `;
    }
  }
}

/**
 * Render repositories to the DOM
 * @param {Array} repos - Array of repository objects
 */
function renderRepos(repos) {
  if (!repos || repos.length === 0) {
    REPO_GRID.innerHTML = `
      <div class="card" style="grid-column:1/-1;text-align:center;padding:2rem;">
        <p>No public repositories found.</p>
      </div>
    `;
    return;
  }

  let html = '';
  repos.forEach(repo => {
    const lang = repo.language || 'N/A';
    const stars = repo.stargazers_count || 0;
    const desc = repo.description || 'No description available.';
    const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const repoUrl = repo.html_url || '#';

    html += `
      <div class="card repo-card">
        <h3><i class="fab fa-github" style="color:#6b4c7a;margin-right:6px;"></i>${repo.name}</h3>
        <p style="font-size:0.9rem;margin-top:0.2rem;">${desc}</p>
        <div class="meta">
          <span><i class="fas fa-star" style="color:#e0b35a;"></i> ${stars}</span>
          <span class="repo-lang"><i class="fas fa-circle" style="color:#6b4c7a;font-size:0.5rem;margin-right:4px;"></i>${lang}</span>
          <span><i class="far fa-calendar-alt"></i> ${updated}</span>
        </div>
        <a href="${repoUrl}" target="_blank" class="repo-link" rel="noopener noreferrer">
          View on GitHub <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;
  });

  REPO_GRID.innerHTML = html;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
