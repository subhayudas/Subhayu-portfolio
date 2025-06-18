import { NextRequest, NextResponse } from "next/server";
import {
  submitUrlForIndexing,
  getIndexingStatus,
  submitMultipleUrls,
  pingSitemapToGoogle,
  triggerCompleteReindexing,
  forceRecrawl,
} from "@/lib/google-indexing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, url, urls, baseUrl } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 },
      );
    }

    switch (action) {
      case "submit":
        if (!url) {
          return NextResponse.json(
            { error: "URL is required for submit action" },
            { status: 400 },
          );
        }
        const submitResult = await submitUrlForIndexing(url);
        return NextResponse.json(submitResult);

      case "submit-multiple":
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
          return NextResponse.json(
            { error: "URLs array is required for submit-multiple action" },
            { status: 400 },
          );
        }
        const multipleResults = await submitMultipleUrls(urls);
        return NextResponse.json({
          success: true,
          results: multipleResults,
          message: `Processed ${urls.length} URLs`,
        });

      case "status":
        if (!url) {
          return NextResponse.json(
            { error: "URL is required for status action" },
            { status: 400 },
          );
        }
        const statusResult = await getIndexingStatus(url);
        return NextResponse.json(statusResult);

      case "ping-sitemap":
        if (!url) {
          return NextResponse.json(
            { error: "Sitemap URL is required for ping-sitemap action" },
            { status: 400 },
          );
        }
        const pingResult = await pingSitemapToGoogle(url);
        return NextResponse.json(pingResult);

      case "complete-reindex":
        const siteBaseUrl = baseUrl || "https://subhayudas.com";
        const completeResult = await triggerCompleteReindexing(siteBaseUrl);
        return NextResponse.json(completeResult);

      case "force-recrawl":
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
          return NextResponse.json(
            { error: "URLs array is required for force-recrawl action" },
            { status: 400 },
          );
        }
        const recrawlResults = await forceRecrawl(urls);
        return NextResponse.json({
          success: true,
          results: recrawlResults,
          message: `Force re-crawl initiated for ${urls.length} URLs`,
        });

      case "quick-update":
        // This action combines sitemap ping and key URL submissions for quick updates
        const quickBaseUrl = baseUrl || "https://subhayudas.com";

        // First, ping the sitemap
        const sitemapPingResult = await pingSitemapToGoogle(
          `${quickBaseUrl}/sitemap.xml`,
        );

        // Then submit the main page and key sections for immediate indexing
        const priorityUrls = [
          quickBaseUrl,
          `${quickBaseUrl}/#about-me`,
          `${quickBaseUrl}/#my-work`,
        ];

        const quickResults = await forceRecrawl(priorityUrls);

        return NextResponse.json({
          success: true,
          sitemapPing: sitemapPingResult,
          urlSubmissions: quickResults,
          message:
            "Quick update completed - sitemap pinged and priority URLs submitted for re-crawling",
        });

      default:
        return NextResponse.json(
          {
            error: "Invalid action",
            availableActions: [
              "submit",
              "submit-multiple",
              "status",
              "ping-sitemap",
              "complete-reindex",
              "force-recrawl",
              "quick-update",
            ],
          },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 },
    );
  }

  try {
    const result = await getIndexingStatus(url);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
