class SpecialPosts extends HTMLElement {
  constructor() {
    super();
    this.posts = [];
    this.filteredPosts = [];
  }

  async connectedCallback() {
    try {
      const response = await fetch('/posts-list.json');
      if (!response.ok) throw new Error('Failed to fetch posts list');

      this.posts = await response.json();
      this.filteredPosts = this.posts;

      this.render();
    } catch (error) {
      console.error('Error loading posts list:', error);
      this.innerHTML = '<p>Failed to load posts.</p>';
    }
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.toLowerCase().includes(query)
    );
    this.updatePostList();
  }

  updatePostList() {
    const listContainer = this.querySelector('.posts-list');
    listContainer.innerHTML = this.filteredPosts
      .map(post => {
        const fileName = post.replace('.html', '');
        return `<a href="/posts/${post}" target="_blank" class="post-link">${fileName}</a>`;
      })
      .join('');
  }

  render() {
    this.innerHTML = `
      <style>
        .posts-container {
          max-width: 600px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .posts-container h3 {
          font-size: 24px;
          margin-bottom: 15px;
          color: #333;
          text-align: center;
        }

        .search-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .post-link {
          display: block;
          margin: 10px 0;
          padding: 10px;
          background-color: #fff;
          border-left: 4px solid #007bff;
          border-radius: 4px;
          text-decoration: none;
          color: #007bff;
          font-size: 18px;
          transition: background-color 0.3s, border-color 0.3s;
        }

        .post-link:hover {
          background-color: #e6f0ff;
          border-color: #0056b3;
        }
      </style>

      <div class="posts-container">
        <h3>Available Posts</h3>
        <input
          type="text"
          class="search-input"
          placeholder="Search posts..."
          oninput="this.getRootNode().host.handleSearch(event)"
        />
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
