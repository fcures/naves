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

      this.posts = await response.json();
      this.filteredPosts = [...this.posts];

      this.render();
    } catch (error) {
      console.error('Error loading posts list:', error);
      this.innerHTML = '<p>Failed to load posts.</p>';
    }
  }

  handleSearch(event) {
    clearTimeout(this.searchTimeout);
    const query = event.target.value.toLowerCase();

    this.searchTimeout = setTimeout(() => {
      this.filteredPosts = this.posts.filter(post =>
        post.toLowerCase().includes(query)
      );
      this.updatePostList(query);
    }, 200); // Debounced to avoid excessive filtering
  }

  updatePostList(query) {
    const listContainer = this.querySelector('.posts-list');
    const resultCount = this.querySelector('.result-count');

    if (!listContainer || !resultCount) return;

    resultCount.textContent = `${this.filteredPosts.length} result${this.filteredPosts.length !== 1 ? 's' : ''}`;

    listContainer.innerHTML = this.filteredPosts
      .map(post => {
        const fileName = post.replace('.html', '');
        const highlighted = query
          ? fileName.replace(new RegExp(query, 'gi'), match => `<strong>${match}</strong>`)
          : fileName;
        return `<a href="/posts/${post}" target="_blank" class="post-link">${highlighted}</a>`;
      })
      .join('');
  }

  clearSearch() {
    this.querySelector('.search-input').value = '';
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
          <input
            type="text"
            class="search-input"
            placeholder="Search posts..."
            oninput="this.getRootNode().host.handleSearch(event)"
          />
          <button class="clear-button" onclick="this.getRootNode().host.clearSearch()">X</button>
        </div>

        <p class="result-count">${this.filteredPosts.length} results</p>
        <div class="posts-list">
          ${this.filteredPosts
            .map(post => {
              const fileName = post.replace('.html', '');
              return `<a href="/posts/${post}" target="_blank" class="post-link">${fileName}</a>`;
            })
            .join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('special-posts', SpecialPosts);
