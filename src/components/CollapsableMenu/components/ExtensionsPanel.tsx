"use client";

import { useState, useEffect } from "react";
import Header from "./Header";

interface Extension {
  id: string;
  name: string;
  publisher: string;
  description: string;
  version: string;
  downloads: number;
  rating: number;
  category: string;
  icon: string;
  installed: boolean;
  enabled: boolean;
  size: string;
  lastUpdated: string;
}

const ExtensionsPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "installed" | "popular" | "recommended"
  >("all");
  const [extensions, setExtensions] = useState<Extension[]>([]);

  const categories = ["all", "installed", "popular", "recommended"] as const;

  useEffect(() => {
    // Mock extensions data
    const mockExtensions: Extension[] = [
      {
        id: "ms-vscode.vscode-typescript-next",
        name: "TypeScript Importer",
        publisher: "pmneo",
        description:
          "Automatically searches for TypeScript definitions in workspace files and provides all known symbols as completion item to allow code completion.",
        version: "1.0.1",
        downloads: 2500000,
        rating: 4.5,
        category: "Programming Languages",
        icon: "🔷",
        installed: true,
        enabled: true,
        size: "2.1 MB",
        lastUpdated: "2 days ago",
      },
      {
        id: "ms-python.python",
        name: "Python",
        publisher: "Microsoft",
        description:
          "IntelliSense (Pylance), Linting, Debugging (multi-threaded, remote), Jupyter Notebooks, code formatting, refactoring, unit tests, and more.",
        version: "2023.20.0",
        downloads: 75000000,
        rating: 4.8,
        category: "Programming Languages",
        icon: "🐍",
        installed: true,
        enabled: true,
        size: "15.2 MB",
        lastUpdated: "1 week ago",
      },
      {
        id: "bradlc.vscode-tailwindcss",
        name: "Tailwind CSS IntelliSense",
        publisher: "Tailwind Labs",
        description: "Intelligent Tailwind CSS tooling for VS Code",
        version: "0.10.5",
        downloads: 8000000,
        rating: 4.7,
        category: "Other",
        icon: "🎨",
        installed: false,
        enabled: false,
        size: "1.8 MB",
        lastUpdated: "3 days ago",
      },
      {
        id: "esbenp.prettier-vscode",
        name: "Prettier - Code formatter",
        publisher: "Prettier",
        description: "Code formatter using prettier",
        version: "10.1.0",
        downloads: 25000000,
        rating: 4.6,
        category: "Formatters",
        icon: "💅",
        installed: true,
        enabled: true,
        size: "3.4 MB",
        lastUpdated: "5 days ago",
      },
      {
        id: "ms-vscode.vscode-json",
        name: "JSON Language Features",
        publisher: "Microsoft",
        description: "Provides rich language support for JSON files",
        version: "1.0.0",
        downloads: 50000000,
        rating: 4.4,
        category: "Programming Languages",
        icon: "📄",
        installed: true,
        enabled: true,
        size: "800 KB",
        lastUpdated: "1 month ago",
      },
      {
        id: "github.copilot",
        name: "GitHub Copilot",
        publisher: "GitHub",
        description: "Your AI pair programmer",
        version: "1.156.0",
        downloads: 15000000,
        rating: 4.9,
        category: "Machine Learning",
        icon: "🤖",
        installed: false,
        enabled: false,
        size: "12.5 MB",
        lastUpdated: "2 days ago",
      },
    ];

    setExtensions(mockExtensions);
  }, []);

  const filteredExtensions = extensions.filter((ext) => {
    const matchesSearch =
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.publisher.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "installed" && ext.installed) ||
      (selectedCategory === "popular" && ext.downloads > 10000000) ||
      (selectedCategory === "recommended" && ext.rating > 4.5);

    return matchesSearch && matchesCategory;
  });

  const handleInstall = (extensionId: string) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === extensionId
          ? { ...ext, installed: true, enabled: true }
          : ext,
      ),
    );
  };

  const handleUninstall = (extensionId: string) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === extensionId
          ? { ...ext, installed: false, enabled: false }
          : ext,
      ),
    );
  };

  const handleToggleEnabled = (extensionId: string) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.id === extensionId ? { ...ext, enabled: !ext.enabled } : ext,
      ),
    );
  };

  const formatDownloads = (downloads: number): string => {
    if (downloads >= 1000000) {
      return `${(downloads / 1000000).toFixed(1)}M`;
    } else if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(0)}K`;
    }
    return downloads.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-[#ffb400]">
          ★
        </span>,
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-[#ffb400]">
          ☆
        </span>,
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-[#6a6a6a]">
          ☆
        </span>,
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <Header menuTitle="EXTENSIONS">
        <div className="flex gap-1">
          <button
            className="hover:bg-gray-600 p-1 rounded-sm"
            title="Refresh Extensions"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3c.789 0 1.57.301 2.165.891l-1.096 1.109h3.5V4.5l-1.096 1.109-.579-.939c-.77-.939-1.934-1.67-3.165-1.67-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4c0-.789-.301-1.57-.891-2.165z" />
            </svg>
          </button>
          <button
            className="hover:bg-gray-600 p-1 rounded-sm"
            title="Install from VSIX"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.22 6.22a.75.75 0 0 0-1.06 1.06l3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75z" />
              <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5z" />
            </svg>
          </button>
          <button
            className="hover:bg-gray-600 p-1 rounded-sm"
            title="More Actions"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM6.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
          </button>
        </div>
      </Header>

      <div className="flex flex-col flex-1 text-sm bg-[#252526] text-[#cccccc] overflow-hidden">
        {/* Search and Filter */}
        <div className="p-3 border-b border-[#3c3c3c] flex-shrink-0">
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Extensions in Marketplace"
              className="w-full pl-8 pr-4 py-2 text-sm bg-[#3c3c3c] border border-[#3c3c3c] text-[#cccccc] placeholder-[#6a6a6a] focus:outline-none focus:border-[#007acc] focus:bg-[#1e1e1e] rounded"
            />
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#6a6a6a]"
              >
                <path d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7s2.11-4.7 4.7-4.7 4.7 2.11 4.7 4.7-2.11 4.7-4.7 4.7z" />
              </svg>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 py-1 text-xs capitalize transition-colors whitespace-nowrap flex-shrink-0 rounded ${
                  selectedCategory === category
                    ? "bg-[#007acc] text-white"
                    : "bg-[#3c3c3c] text-[#cccccc] hover:bg-[#464647]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Extensions List */}
        <div className="flex-1 overflow-y-auto">
          {filteredExtensions.length === 0 ? (
            <div className="p-4 text-center text-[#6a6a6a]">
              <div className="text-4xl mb-4">📦</div>
              <div className="text-sm mb-2">No extensions found</div>
              <div className="text-xs">Try adjusting your search or filter</div>
            </div>
          ) : (
            <div className="divide-y divide-[#3c3c3c]">
              {filteredExtensions.map((extension) => (
                <div
                  key={extension.id}
                  className="p-3 hover:bg-[#2a2d2e] transition-colors"
                >
                  <div className="flex gap-3">
                    {/* Extension Icon */}
                    <div className="w-10 h-10 bg-[#3c3c3c] rounded flex items-center justify-center text-xl flex-shrink-0">
                      {extension.icon}
                    </div>

                    {/* Extension Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-[#ffffff] truncate leading-tight">
                            {extension.name}
                          </h3>
                          <p className="text-xs text-[#6a6a6a] mb-1 truncate">
                            {extension.publisher}
                          </p>
                          <p className="text-xs text-[#cccccc] line-clamp-2 mb-2 leading-relaxed">
                            {extension.description}
                          </p>

                          {/* Extension Meta */}
                          <div className="flex items-center gap-3 text-xs text-[#6a6a6a] mb-2">
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {renderStars(extension.rating)}
                              </div>
                              <span>({extension.rating})</span>
                            </div>
                            <span>{formatDownloads(extension.downloads)}</span>
                            <span className="text-[#569cd6]">
                              v{extension.version}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        {extension.installed ? (
                          <>
                            <button
                              onClick={() => handleToggleEnabled(extension.id)}
                              className={`px-3 py-1 text-xs rounded transition-colors font-medium ${
                                extension.enabled
                                  ? "bg-[#28a745] text-white hover:bg-[#218838]"
                                  : "bg-[#6c757d] text-white hover:bg-[#5a6268]"
                              }`}
                              title={
                                extension.enabled
                                  ? "Disable Extension"
                                  : "Enable Extension"
                              }
                            >
                              {extension.enabled ? "Enabled" : "Disabled"}
                            </button>
                            <button
                              onClick={() => handleUninstall(extension.id)}
                              className="px-3 py-1 text-xs bg-[#dc3545] text-white rounded hover:bg-[#c82333] transition-colors font-medium"
                              title="Uninstall Extension"
                            >
                              Uninstall
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleInstall(extension.id)}
                            className="px-3 py-1 text-xs bg-[#007acc] text-white rounded hover:bg-[#005a9e] transition-colors font-medium"
                            title="Install Extension"
                          >
                            Install
                          </button>
                        )}
                        <button
                          className="p-1 hover:bg-[#3c3c3c] rounded transition-colors"
                          title="More Options"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="text-[#6a6a6a]"
                          >
                            <path d="M8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM6.5 14.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Extensions Summary */}
        <div className="border-t border-[#3c3c3c] p-2 text-xs text-[#6a6a6a] bg-[#2d2d30] flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="truncate">
              {filteredExtensions.length} extension
              {filteredExtensions.length !== 1 ? "s" : ""}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <span className="flex-shrink-0 ml-2">
              {extensions.filter((ext) => ext.installed).length} installed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionsPanel;
