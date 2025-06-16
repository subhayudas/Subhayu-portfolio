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
