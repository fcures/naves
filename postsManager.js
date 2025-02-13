import fs from 'fs/promises';
import path from 'path';

class SpecialPosts extends HTMLElement {
  async connectedCallback() {
    try {
      const postsDir = path.resolve('/posts/');
      const files = await fs.readdir(postsDir);
      const htmlFiles = files.filter(file => path.extname(file) === '.html');

      if (htmlFiles.length === 0) {
        this.innerHTML = '<p>No HTML posts available.</p>';
        return;
      }

      const listItems = htmlFiles.map(file => {
        const fileName = path.basename(file, '.html');
        return `<li><a href="/posts/${file}" target="_blank">${fileName}</a></li>`;
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
      console.error('Error reading posts directory:', error);
      this.innerHTML = '<p>Failed to load posts.</p>';
    }
  }
}

customElements.define('special-posts', SpecialPosts);
