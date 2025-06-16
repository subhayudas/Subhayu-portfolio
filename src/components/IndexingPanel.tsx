"use client";

import { useState } from "react";

interface IndexingResult {
  success: boolean;
  message: string;
  error?: string;
  data?: Record<string, unknown>;
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

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Google Indexing Panel
      </h2>

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
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-md border ${
                result.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      result.success ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {result.message}
                  </p>
                  {result.error && (
                    <p className="text-red-600 text-sm mt-1">{result.error}</p>
                  )}
                  {result.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-600">
                        View Details
                      </summary>
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    result.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {result.success ? "Success" : "Error"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>
            • Make sure your Google service account JSON file is placed in the
            root directory as `google-service-account.json`
          </li>
          <li>
            • The service account must have access to Google Search Console for
            your domain
          </li>
          <li>• You can submit individual URLs or multiple URLs at once</li>
          <li>
            • Use &ldquo;Check Status&rdquo; to see the current indexing status
            of a URL
          </li>
          <li>
            • There may be rate limits, so multiple URLs are processed with
            delays
          </li>
        </ul>
      </div>
    </div>
  );
}
