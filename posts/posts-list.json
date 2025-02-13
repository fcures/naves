const fs = require('fs');
const path = require('path');

// Path to the posts directory
const postsDir = path.join(__dirname, 'posts');

// Get a list of all HTML files in the posts directory
fs.readdir(postsDir, (err, files) => {
  if (err) {
    console.error('Error reading posts directory:', err);
    return;
  }

  // Filter only HTML files
  const htmlFiles = files.filter(file => path.extname(file) === '.html');

  // Create a JSON object with the list of HTML files
  const postsList = JSON.stringify(htmlFiles, null, 2);

  // Write the list to posts-list.json
  fs.writeFileSync(path.join(__dirname, 'posts-list.json'), postsList);

  console.log('posts-list.json generated successfully!');
});
