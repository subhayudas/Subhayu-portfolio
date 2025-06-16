import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* SEO and Performance Optimizations */
  
  // Enable trailing slash for consistent URLs
  trailingSlash: true,
  
  // Image optimization for better performance and SEO
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compress HTML, CSS, and JS for better performance
  compress: true,
  
  // Enable experimental features for better SEO (removed optimizeCss due to critters dependency issue)
  experimental: {
    scrollRestoration: true,
  },
  
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO (if needed)
  async redirects() {
    return [
      // Add any necessary redirects here
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      // Add any URL rewrites here for cleaner URLs
    ];
  },
};

export default nextConfig;
