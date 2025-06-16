// Script to generate URLs for your portfolio website
// Run this with: node scripts/generate-urls.js

const fs = require('fs');
const path = require('path');

// Replace with your actual domain
const DOMAIN = 'https://subhayudas.com';

// Common portfolio pages - customize based on your actual routes
const portfolioUrls = [
  '', // Home page
  '/about',
  '/projects',
  '/contact',
  '/resume',
  '/blog', // if you have a blog
];

// Function to scan for dynamic routes (if you have any)
function scanForDynamicRoutes() {
  const dynamicUrls = [];
  
  // Example: If you have project pages, you might scan the public/projects folder
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  if (fs.existsSync(projectsDir)) {
    const projects = fs.readdirSync(projectsDir);
    projects.forEach(project => {
      if (fs.statSync(path.join(projectsDir, project)).isDirectory()) {
        dynamicUrls.push(`/projects/${project}`);
      }
    });
  }
  
  // Example: If you have work experience pages
  const workDir = path.join(process.cwd(), 'public', 'work');
  if (fs.existsSync(workDir)) {
    const workItems = fs.readdirSync(workDir);
    workItems.forEach(item => {
      if (fs.statSync(path.join(workDir, item)).isDirectory()) {
        dynamicUrls.push(`/work/${item}`);
      }
    });
  }
  
  return dynamicUrls;
}

// Generate complete URLs
function generateUrls() {
  const dynamicUrls = scanForDynamicRoutes();
  const allPaths = [...portfolioUrls, ...dynamicUrls];
  
  const completeUrls = allPaths.map(path => {
    return path === '' ? DOMAIN : `${DOMAIN}${path}`;
  });
  
  return completeUrls;
}

// Main function
function main() {
  console.log('🔍 Generating URLs for your portfolio...\n');
  
  const urls = generateUrls();
  
  console.log('📋 Generated URLs:');
  console.log('==================');
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  console.log(`\n✅ Total URLs: ${urls.length}`);
  
  // Save to file
  const outputFile = path.join(process.cwd(), 'portfolio-urls.txt');
  fs.writeFileSync(outputFile, urls.join('\n'));
  console.log(`💾 URLs saved to: ${outputFile}`);
  
  // Also create a JSON version for programmatic use
  const jsonFile = path.join(process.cwd(), 'portfolio-urls.json');
  fs.writeFileSync(jsonFile, JSON.stringify(urls, null, 2));
  console.log(`💾 URLs also saved as JSON to: ${jsonFile}`);
  
  console.log('\n📝 Next steps:');
  console.log('1. Update the DOMAIN variable in this script with your actual domain');
  console.log('2. Place your Google service account JSON file as "google-service-account.json" in the root directory');
  console.log('3. Visit /indexing on your website to use the indexing panel');
  console.log('4. Copy the URLs from portfolio-urls.txt and paste them into the indexing panel');
}

if (require.main === module) {
  main();
}

module.exports = { generateUrls }; 