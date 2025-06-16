import { NextRequest, NextResponse } from "next/server";
import {
  submitUrlForIndexing,
  getIndexingStatus,
  submitMultipleUrls,
} from "@/lib/google-indexing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, url, urls } = body;

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

      default:
        return NextResponse.json(
          { error: "Invalid action. Use: submit, submit-multiple, or status" },
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
