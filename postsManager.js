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

      // Template to inject HTML and CSS
      this.innerHTML = `
        <style>
          .posts-container {
            max-width: 600px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .posts-container h3 {
            font-size: 24px;
            margin-bottom: 15px;
            color: #333;
          }

          .posts-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          .posts-list li {
            display: block; /* Makes sure each item is in its own block */
            margin-bottom: 12px;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 18px;
            color: #333;
          }

          .posts-list a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }

          /* Hover effect on links */
          .posts-list a:hover {
            text-decoration: underline;
          }
        </style>

        <div class="posts-container">
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
