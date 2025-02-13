const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts'); // Directory with HTML posts
const outputFile = path.join(__dirname, 'posts-list.json');

// Helper function to extract the title from HTML content
function extractTitle(content) {
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : null;
}

// Helper function to extract the description from HTML content
function extractDescription(content) {
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  return descMatch ? descMatch[1].trim() : null;
}

fs.readdir(postsDir, (err, files) => {
  if (err) {
    console.error('Error reading posts directory:', err);
    return;
  }

  const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');
  const postsData = [];
  let processedCount = 0;

  if (htmlFiles.length === 0) {
    fs.writeFileSync(outputFile, JSON.stringify(postsData, null, 2));
    console.log('posts-list.json generated successfully with no posts.');
    return;
  }

  htmlFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    fs.readFile(filePath, 'utf8', (err, content) => {
      processedCount++;
      if (err) {
        console.error(`Error reading ${file}:`, err);
      } else {
        const title = extractTitle(content) || file.replace('.html', '');
        const description = extractDescription(content) || '';
        postsData.push({
          filename: file,
          title: title,
          description: description
        });
      }
      // Once all files are processed, write the JSON file
      if (processedCount === htmlFiles.length) {
        fs.writeFile(outputFile, JSON.stringify(postsData, null, 2), (err) => {
          if (err) {
            console.error('Error writing posts-list.json:', err);
          } else {
            console.log('posts-list.json generated successfully!');
          }
        });
      }
    });
  });
});
