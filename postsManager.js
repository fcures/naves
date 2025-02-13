class SpecialPosts extends HTMLElement {
  async connectedCallback() {
    try {
      const response = await fetch('/posts-list.json');  
      if (!response.ok) throw new Error('Failed to fetch posts list');

      const posts = await response.json();

      if (!Array.isArray(posts) || posts.length === 0) {
        this.innerHTML = '<p>No posts available.</p>';
        return;
      }

      // Generate list of available posts
      const listItems = posts.map(post => {
        const fileName = post.replace('.html', ''); // Remove .html extension
        return `<li><a href="/posts/${post}" target="_blank">${fileName}</a></li>`;
      }).join('');

      this.innerHTML = `
        <style>
          .posts-container {
            max-width: 600px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
          }
          .posts-container h3 {
            font-size: 22px;
            margin-bottom: 10px;
          }
          .posts-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          .posts-list li {
            margin: 10px 0;
            font-size: 18px;
          }
          .posts-list a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
          .posts-list a:hover {
            text-decoration: underline;
          }
        </style>
        <div class="posts-container">
          <h3>Available Posts</h3>
          <ul class="posts-list">
            ${listItems}
          </ul>
        </div>
      `;
    } catch (error) {
      console.error('Error loading posts list:', error);
      this.innerHTML = '<p>Failed to load posts.</p>';
    }
  }
}

customElements.define('special-posts', SpecialPosts);
