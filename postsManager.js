class SpecialPosts extends HTMLElement {
  async connectedCallback() {
    try {
      const response = await fetch('/posts-list.json');  // This file should contain a list of your HTML files
      const posts = await response.json();

      if (posts.length === 0) {
        this.innerHTML = '<p>No HTML posts available.</p>';
        return;
      }

      // Generate the list items for available posts
      const listItems = posts.map(post => {
        const fileName = post.replace('.html', ''); // Remove .html extension
        return `<li><a href="/posts/${post}" target="_blank">${fileName}</a></li>`;
      }).join('');

      this.innerHTML = `
        <style>
          .posts-list {
            list-style-type: none;
            padding: 0;
          }
          .posts-list li {
            margin: 5px 0;
          }
          .posts-list a {
            text-decoration: none;
            color: #007bff;
          }
          .posts-list a:hover {
            text-decoration: underline;
          }
        </style>
        <h3>Available Posts</h3>
        <ul class="posts-list">
          ${listItems}
        </ul>
      `;
    } catch (error) {
      console.error('Error loading posts list:', error);
      this.innerHTML = '<p>Failed to load posts.</p>';
    }
  }
}

customElements.define('special-posts', SpecialPosts);
