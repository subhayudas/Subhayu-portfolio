#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'https://subhayudas.com';
const API_ENDPOINT = '/api/indexing';

// Function to make HTTP request
function makeRequest(hostname, path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: hostname,
      port: hostname === 'localhost' ? 3000 : 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const protocol = hostname === 'localhost' ? http : https;
    
    const req = protocol.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseBody);
          resolve({ status: res.statusCode, data: result });
        } catch (error) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Main function to trigger quick update
async function triggerQuickUpdate() {
  console.log('🚀 Starting quick Google Search Console update...\n');
  
  try {
    // Check if running locally or in production
    const isLocal = process.argv.includes('--local');
    const hostname = isLocal ? 'localhost' : 'subhayudas.com';
    
    console.log(`📡 Targeting: ${isLocal ? 'Local development' : 'Production'} server`);
    console.log(`🌐 Base URL: ${BASE_URL}\n`);

    // Trigger the quick-update action
    const response = await makeRequest(hostname, API_ENDPOINT, {
      action: 'quick-update',
      baseUrl: BASE_URL
    });

    if (response.status === 200 && response.data.success) {
      console.log('✅ Quick update completed successfully!\n');
      
      console.log('📋 Results:');
      console.log(`   • Sitemap ping: ${response.data.sitemapPing?.success ? '✅ Success' : '❌ Failed'}`);
      if (response.data.sitemapPing?.message) {
        console.log(`     ${response.data.sitemapPing.message}`);
      }
      
      console.log(`   • URL submissions: ${response.data.urlSubmissions?.length || 0} URLs processed`);
      
      if (response.data.urlSubmissions) {
        response.data.urlSubmissions.forEach((result, index) => {
          const status = result.success ? '✅' : '❌';
          console.log(`     ${index + 1}. ${status} ${result.url}`);
        });
      }
      
      console.log(`\n💡 ${response.data.message}`);
      
    } else {
      console.log('❌ Quick update failed:');
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${response.data.error || 'Unknown error'}`);
      if (response.data.message) {
        console.log(`   Message: ${response.data.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error during quick update:', error.message);
    process.exit(1);
  }
}

// Advanced function for complete re-indexing
async function triggerCompleteReindex() {
  console.log('🔄 Starting complete re-indexing process...\n');
  
  try {
    const isLocal = process.argv.includes('--local');
    const hostname = isLocal ? 'localhost' : 'subhayudas.com';
    
    const response = await makeRequest(hostname, API_ENDPOINT, {
      action: 'complete-reindex',
      baseUrl: BASE_URL
    });

    if (response.status === 200 && response.data.success) {
      console.log('✅ Complete re-indexing completed!\n');
      
      const summary = response.data.data.summary;
      console.log('📊 Summary:');
      console.log(`   • Total URLs: ${summary.totalUrls}`);
      console.log(`   • Successful: ${summary.successfulSubmissions}`);
      console.log(`   • Failed: ${summary.failedSubmissions}`);
      
      console.log('\n📋 Detailed Results:');
      response.data.data.urlSubmissions.forEach((result, index) => {
        const status = result.success ? '✅' : '❌';
        console.log(`   ${index + 1}. ${status} ${result.url}`);
      });
      
    } else {
      console.log('❌ Complete re-indexing failed:', response.data.error);
    }
    
  } catch (error) {
    console.error('❌ Error during complete re-indexing:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const action = args[0];

console.log('🔍 Google Search Console Quick Indexing Tool\n');

switch (action) {
  case 'quick':
  case 'quick-update':
    triggerQuickUpdate();
    break;
    
  case 'complete':
  case 'complete-reindex':
    triggerCompleteReindex();
    break;
    
  default:
    console.log('Usage:');
    console.log('  node scripts/quick-index-update.js quick [--local]     # Quick update (recommended)');
    console.log('  node scripts/quick-index-update.js complete [--local]  # Complete re-indexing');
    console.log('');
    console.log('Options:');
    console.log('  --local    Target local development server (localhost:3000)');
    console.log('');
    console.log('Examples:');
    console.log('  npm run index:quick      # Quick update for production');
    console.log('  npm run index:complete   # Complete re-indexing for production');
    break;
} 