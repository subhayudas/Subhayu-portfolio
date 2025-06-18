"use client";

import { useState } from "react";

interface IndexingResult {
  success: boolean;
  message: string;
  error?: string;
  data?: Record<string, unknown>;
  sitemapPing?: {
    success: boolean;
    message: string;
  };
  urlSubmissions?: Array<{
    url: string;
    success: boolean;
    message: string;
  }>;
  results?: IndexingResult[];
}

export default function IndexingPanel() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IndexingResult[]>([]);

  const submitSingleUrl = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/indexing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submit",
          url: url.trim(),
        }),
      });

      const result = await response.json();
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      setResults((prev) => [
        {
          success: false,
          message: "Failed to submit URL",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitMultipleUrls = async () => {
    const urlList = urls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (urlList.length === 0) {
      alert("Please enter at least one URL");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/indexing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submit-multiple",
          urls: urlList,
        }),
      });

      const result = await response.json();
      if (result.results) {
        setResults((prev) => [...result.results, ...prev]);
      } else {
        setResults((prev) => [result, ...prev]);
      }
    } catch (error) {
      console.error("Error:", error);
      setResults((prev) => [
        {
          success: false,
          message: "Failed to submit URLs",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/indexing?url=${encodeURIComponent(url.trim())}`,
      );
      const result = await response.json();
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      setResults((prev) => [
        {
          success: false,
          message: "Failed to check status",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  // New function for quick update
  const triggerQuickUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/indexing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "quick-update",
          baseUrl: "https://subhayudas.com",
        }),
      });

      const result = await response.json();
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      setResults((prev) => [
        {
          success: false,
          message: "Failed to trigger quick update",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  // New function for complete reindexing
  const triggerCompleteReindex = async () => {
    if (!confirm("This will submit all pages for re-indexing. Continue?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/indexing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "complete-reindex",
          baseUrl: "https://subhayudas.com",
        }),
      });

      const result = await response.json();
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      setResults((prev) => [
        {
          success: false,
          message: "Failed to trigger complete reindex",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  // New function for sitemap ping
  const pingSitemap = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/indexing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ping-sitemap",
          url: "https://subhayudas.com/sitemap.xml",
        }),
      });

      const result = await response.json();
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      setResults((prev) => [
        {
          success: false,
          message: "Failed to ping sitemap",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Google Search Console Indexing Panel
      </h2>

      {/* Quick Actions Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <span className="mr-2">⚡</span>
          Quick Actions (Recommended for Metadata/Favicon Updates)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={triggerQuickUpdate}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 font-medium shadow-md transition-all duration-200 transform hover:scale-105"
          >
            🚀 Quick Update
            <div className="text-xs mt-1 opacity-90">
              Sitemap + Priority URLs
            </div>
          </button>
          <button
            onClick={pingSitemap}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 font-medium shadow-md transition-all duration-200 transform hover:scale-105"
          >
            📡 Ping Sitemap
            <div className="text-xs mt-1 opacity-90">
              Notify Google of changes
            </div>
          </button>
          <button
            onClick={triggerCompleteReindex}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 font-medium shadow-md transition-all duration-200 transform hover:scale-105"
          >
            🔄 Complete Reindex
            <div className="text-xs mt-1 opacity-90">All pages (slower)</div>
          </button>
        </div>
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Use "Quick Update" after changing metadata,
            favicon, or content. It pings your sitemap and submits priority URLs
            for immediate re-crawling.
          </p>
        </div>
      </div>

      {/* Single URL Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Single URL</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-website.com/page"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={submitSingleUrl}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Submit for Indexing
          </button>
          <button
            onClick={checkStatus}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            Check Status
          </button>
        </div>
      </div>

      {/* Multiple URLs Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Multiple URLs
        </h3>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter one URL per line:&#10;https://your-website.com/page1&#10;https://your-website.com/page2&#10;https://your-website.com/page3"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={submitMultipleUrls}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
        >
          Submit All for Indexing
        </button>
      </div>

      {/* Results Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Results</h3>
          {results.length > 0 && (
            <button
              onClick={clearResults}
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              Clear Results
            </button>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Processing...</span>
          </div>
        )}

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        result.success ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span className="font-medium text-gray-800">
                      {result.success ? "Success" : "Failed"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{result.message}</p>

                  {/* Enhanced result display for quick update */}
                  {result.sitemapPing && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <div className="text-xs font-medium text-gray-600 mb-1">
                        Sitemap Ping:
                      </div>
                      <div
                        className={`text-xs ${result.sitemapPing.success ? "text-green-600" : "text-red-600"}`}
                      >
                        {result.sitemapPing.success ? "✅" : "❌"}{" "}
                        {result.sitemapPing.message}
                      </div>
                    </div>
                  )}

                  {result.urlSubmissions && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <div className="text-xs font-medium text-gray-600 mb-1">
                        URL Submissions:
                      </div>
                      <div className="space-y-1">
                        {result.urlSubmissions.map((submission, idx) => (
                          <div key={idx} className="text-xs">
                            <span
                              className={
                                submission.success
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {submission.success ? "✅" : "❌"}
                            </span>
                            <span className="ml-1 text-gray-600">
                              {submission.url}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.error && (
                    <p className="text-xs text-red-600 mt-1">
                      Error: {result.error}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-500 ml-4">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No results yet. Use the actions above to start indexing.
          </div>
        )}
      </div>
    </div>
  );
}
