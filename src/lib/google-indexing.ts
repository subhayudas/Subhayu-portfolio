import { google } from "googleapis";
import path from "path";

export async function submitUrlForIndexing(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED",
) {
  try {
    // Path to your service account key file
    const keyFilePath = path.join(process.cwd(), "google-service-account.json");

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    google.options({ auth });

    const indexing = google.indexing("v3");

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    return {
      success: true,
      data: response.data,
      message: `Successfully submitted ${url} for indexing`,
    };
  } catch (error) {
    console.error("Error submitting URL for indexing:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: `Failed to submit ${url} for indexing`,
    };
  }
}

export async function getIndexingStatus(url: string) {
  try {
    // Path to your service account key file
    const keyFilePath = path.join(process.cwd(), "google-service-account.json");

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    google.options({ auth });

    const indexing = google.indexing("v3");

    const response = await indexing.urlNotifications.getMetadata({
      url: url,
    });

    return {
      success: true,
      data: response.data,
      message: `Successfully retrieved indexing status for ${url}`,
    };
  } catch (error) {
    console.error("Error getting indexing status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: `Failed to get indexing status for ${url}`,
    };
  }
}

export async function submitMultipleUrls(urls: string[]) {
  const results = [];

  for (const url of urls) {
    const result = await submitUrlForIndexing(url);
    results.push({ url, ...result });

    // Add a small delay between requests to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return results;
}

// New function to ping Google about sitemap updates
export async function pingSitemapToGoogle(sitemapUrl: string) {
  try {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

    const response = await fetch(pingUrl, {
      method: "GET",
    });

    if (response.ok) {
      return {
        success: true,
        message: `Successfully pinged Google about sitemap update: ${sitemapUrl}`,
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error pinging sitemap to Google:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: `Failed to ping sitemap to Google: ${sitemapUrl}`,
    };
  }
}

// Enhanced function to trigger complete re-indexing
export async function triggerCompleteReindexing(baseUrl: string) {
  const results = {
    sitemapPing: null as { success: boolean; message: string } | null,
    urlSubmissions: [] as Array<{
      url: string;
      success: boolean;
      message: string;
    }>,
    summary: {
      totalUrls: 0,
      successfulSubmissions: 0,
      failedSubmissions: 0,
    },
  };

  try {
    // 1. Ping sitemap to Google
    const sitemapUrl = `${baseUrl}/sitemap.xml`;
    results.sitemapPing = await pingSitemapToGoogle(sitemapUrl);

    // 2. Submit all URLs for indexing
    const urlsToSubmit = [
      baseUrl,
      `${baseUrl}/#about-me`,
      `${baseUrl}/#work-experience`,
      `${baseUrl}/#skills`,
      `${baseUrl}/#my-work`,
      `${baseUrl}/#contact`,
      `${baseUrl}/apps/movie-sentiment-predictor`,
      `${baseUrl}/apps/ai-border-surveillance`,
      `${baseUrl}/apps/afk-detector`,
      `${baseUrl}/apps/notibit`,
      `${baseUrl}/apps/ieee-website`,
      `${baseUrl}/apps/Youtube-video-summarizer`,
    ];

    results.summary.totalUrls = urlsToSubmit.length;

    // Submit URLs with proper delay
    for (const url of urlsToSubmit) {
      const result = await submitUrlForIndexing(url);
      results.urlSubmissions.push({ url, ...result });

      if (result.success) {
        results.summary.successfulSubmissions++;
      } else {
        results.summary.failedSubmissions++;
      }

      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    return {
      success: true,
      data: results,
      message: `Complete re-indexing triggered. ${results.summary.successfulSubmissions}/${results.summary.totalUrls} URLs submitted successfully.`,
    };
  } catch (error) {
    console.error("Error during complete re-indexing:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      message: "Failed to trigger complete re-indexing",
      data: results,
    };
  }
}

// Function to submit URLs for immediate crawling (forces Google to re-crawl)
export async function forceRecrawl(urls: string[]) {
  const results = [];

  for (const url of urls) {
    try {
      // Submit as URL_UPDATED to force re-crawl
      const result = await submitUrlForIndexing(url, "URL_UPDATED");
      results.push({ url, ...result });

      // Additional delay for force re-crawl
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      results.push({
        url,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: `Failed to force re-crawl for ${url}`,
      });
    }
  }

  return results;
}
