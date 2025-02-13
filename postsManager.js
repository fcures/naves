class SpecialPosts extends HTMLElement {
  constructor() {
    super();
    this.posts = [];
    this.filteredPosts = [];
    this.searchTimeout = null;
  }

  async connectedCallback() {
    try {
      const response = await fetch('/posts-list.json');
      if (!response.ok) throw new Error('Failed to fetch posts list');
      
      this.posts = await response.json(); // Now an array of objects with filename, title, description
      this.filteredPosts = [...this.posts];
      this.render();
      this.attachEventListeners();
    } catch (error) {
      console.error('Error loading posts list:', error);
      this.innerHTML = '<p>Failed to load posts.</p>';
    }
  }

  attachEventListeners() {
    const searchInput = this.querySelector('.search-input');
    const clearButton = this.querySelector('.clear-button');
    if (searchInput) {
      searchInput.addEventListener('input', (event) => this.handleSearch(event));
    }
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearSearch());
    }
  }

  handleSearch(event) {
    clearTimeout(this.searchTimeout);
    const query = event.target.value.trim().toLowerCase();
    this.searchTimeout = setTimeout(() => {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        (post.description && post.description.toLowerCase().includes(query))
      );
      this.updatePostList(query);
    }, 200);
  }

  // Highlight matching text in a string
  highlightText(text, query) {
    if (!query) return text;
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');
    return text.replace(regex, match => `<strong>${match}</strong>`);
  }

  updatePostList(query) {
    const listContainer = this.querySelector('.posts-list');
    const resultCount = this.querySelector('.result-count');
    if (!listContainer || !resultCount) return;

    resultCount.textContent = `${this.filteredPosts.length} result${this.filteredPosts.length !== 1 ? 's' : ''}`;
    listContainer.innerHTML = this.filteredPosts
      .map(post => {
        const title = post.title || post.filename.replace('.html', '');
        const highlightedTitle = this.highlightText(title, query);
        const highlightedDescription = post.description ? this.highlightText(post.description, query) : '';
        return `
          <a href="/posts/${post.filename}" target="_blank" class="post-link">
            <h4>${highlightedTitle}</h4>
            <p>${highlightedDescription}</p>
          </a>
        `;
      })
      .join('');
  }

  clearSearch() {
    const searchInput = this.querySelector('.search-input');
    if (searchInput) searchInput.value = '';
    this.filteredPosts = [...this.posts];
    this.updatePostList('');
  }

  render() {
    this.innerHTML = `
      <style>
        .posts-container {
          max-width: 600px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .posts-container h3 {
          font-size: 24px;
          margin-bottom: 15px;
          color: #333;
        }
        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .search-input {
          width: 80%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .clear-button {
          background: #ff4d4d;
          color: white;
          border: none;
          padding: 10px 14px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .clear-button:hover {
          background: #cc0000;
        }
        .result-count {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        .post-link {
          display: block;
          text-align: left;
          margin: 10px 0;
          padding: 10px;
          background-color: #f8f9fa;
          border-left: 4px solid #007bff;
          border-radius: 4px;
          text-decoration: none;
          color: #007bff;
          font-size: 18px;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .post-link h4 {
          margin: 0 0 5px;
          font-size: 20px;
        }
        .post-link p {
          margin: 0;
          font-size: 14px;
          color: #555;
        }
        .post-link strong {
          background-color: yellow;
        }
        .post-link:hover {
          background-color: #e6f0ff;
          border-color: #0056b3;
        }
      </style>
      <div class="posts-container">
        <div class="search-container">
          <input type="text" class="search-input" placeholder="Search posts..." />
          <button class="clear-button">X</button>
        </div>
        <p class="result-count">${this.filteredPosts.length} results</p>
        <div class="posts-list">
          ${this.filteredPosts
            .map(post => {
              const title = post.title || post.filename.replace(/\.html$/, '');
              return `
                <a href="/posts/${post.filename.replace(/\.html$/, '')}" class="post-link">
                  <h4>${title}</h4>
                  <p>${post.description || ''}</p>
                </a>
              `;
            })
            .join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('special-posts', SpecialPosts);
