"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronRight } from "@/icons";
import Header from "./Header";

interface SearchResult {
  type: "skill" | "project" | "experience" | "section";
  title: string;
  content: string;
  category?: string;
  highlight?: string;
}

const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["all"]),
  );
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "skills" | "projects" | "experience" | "sections"
  >("all");

  // Mock data - in a real app, this would come from your data store
  const searchableContent: SearchResult[] = useMemo(
    () => [
      // Skills
      {
        type: "skill",
        title: "React",
        content: "Frontend library for building user interfaces",
        category: "Frontend",
      },
      {
        type: "skill",
        title: "TypeScript",
        content: "Typed superset of JavaScript",
        category: "Languages",
      },
      {
        type: "skill",
        title: "Node.js",
        content: "JavaScript runtime for server-side development",
        category: "Backend",
      },
      {
        type: "skill",
        title: "Python",
        content: "Programming language for web development and data science",
        category: "Languages",
      },
      {
        type: "skill",
        title: "AWS",
        content: "Amazon Web Services cloud platform",
        category: "Cloud",
      },
      {
        type: "skill",
        title: "Docker",
        content: "Containerization platform",
        category: "DevOps",
      },
      {
        type: "skill",
        title: "PostgreSQL",
        content: "Relational database management system",
        category: "Database",
      },
      {
        type: "skill",
        title: "MongoDB",
        content: "NoSQL document database",
        category: "Database",
      },

      // Projects
      {
        type: "project",
        title: "AI Border Surveillance",
        content:
          "Machine learning project for border security using computer vision",
        category: "AI/ML",
      },
      {
        type: "project",
        title: "Bake.io",
        content: "Full-stack web application for bakery management",
        category: "Web Development",
      },
      {
        type: "project",
        title: "DApp Wallet Transfer",
        content: "Blockchain application for cryptocurrency transfers",
        category: "Blockchain",
      },
      {
        type: "project",
        title: "Movie Sentiment Predictor",
        content:
          "Natural language processing for movie review sentiment analysis",
        category: "AI/ML",
      },
      {
        type: "project",
        title: "YouTube Video Summarizer",
        content: "AI-powered tool for video content summarization",
        category: "AI/ML",
      },

      // Experience
      {
        type: "experience",
        title: "Senior Full Stack Developer",
        content:
          "Led development of enterprise applications using React and Node.js",
        category: "Work",
      },
      {
        type: "experience",
        title: "Machine Learning Engineer",
        content: "Developed AI models for predictive analytics",
        category: "Work",
      },
      {
        type: "experience",
        title: "Technical Lead",
        content: "Managed team of 5 developers on multiple projects",
        category: "Leadership",
      },

      // Sections
      {
        type: "section",
        title: "About Me",
        content: "Personal information and career overview",
        category: "Portfolio",
      },
      {
        type: "section",
        title: "Skills",
        content: "Technical skills and expertise",
        category: "Portfolio",
      },
      {
        type: "section",
        title: "Projects",
        content: "Featured projects and case studies",
        category: "Portfolio",
      },
      {
        type: "section",
        title: "Work Experience",
        content: "Professional experience and achievements",
        category: "Portfolio",
      },
    ],
    [],
  );

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filteredResults = searchableContent
        .filter((item) => {
          const matchesQuery =
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query);

          const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "skills" && item.type === "skill") ||
            (selectedFilter === "projects" && item.type === "project") ||
            (selectedFilter === "experience" && item.type === "experience") ||
            (selectedFilter === "sections" && item.type === "section");

          return matchesQuery && matchesFilter;
        })
        .map((item) => ({
          ...item,
          highlight:
            highlightText(item.title, query) ||
            highlightText(item.content, query),
        }));

      setResults(filteredResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedFilter, searchableContent]);

  const highlightText = (text: string, query: string): string => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      '<mark class="bg-yellow-200 text-black">$1</mark>',
    );
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach((result) => {
      const key = result.category || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(result);
    });
    return groups;
  }, [results]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "skill":
        return "🛠️";
      case "project":
        return "🚀";
      case "experience":
        return "💼";
      case "section":
        return "📄";
      default:
        return "📋";
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <Header menuTitle="SEARCH">
        <div className="flex gap-1">
          <button
            onClick={clearSearch}
            className="hover:bg-gray-600 p-1 rounded-sm text-xs"
            title="Clear All Results"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z" />
              </svg>
            </div>
          </button>
          <button className="hover:bg-gray-600 p-1 rounded-sm" title="Refresh">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3c.789 0 1.57.301 2.165.891l-1.096 1.109h3.5V4.5l-1.096 1.109-.579-.939c-.77-.939-1.934-1.67-3.165-1.67-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4c0-.789-.301-1.57-.891-2.165z" />
              </svg>
            </div>
          </button>
        </div>
      </Header>

      <div className="flex flex-col flex-1 bg-[#252526] text-[#cccccc] overflow-hidden">
        {/* Search Input */}
        <div className="p-2 border-b border-[#3c3c3c] flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-8 pr-8 py-1 text-sm bg-[#3c3c3c] border border-[#3c3c3c] text-[#cccccc] placeholder-[#6a6a6a] focus:outline-none focus:border-[#007acc] focus:bg-[#1e1e1e] rounded"
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
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-[#6a6a6a] hover:text-[#cccccc]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z" />
                </svg>
              </button>
            )}
          </div>

          {/* Replace and Match Case buttons */}
          <div className="flex items-center mt-2 gap-1 overflow-x-auto">
            <button
              className="p-1 hover:bg-[#3c3c3c] rounded-sm flex-shrink-0"
              title="Toggle Replace"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#6a6a6a]"
              >
                <path d="M11.013 4.147a.75.75 0 0 1 .04 1.06L9.78 6.72a.75.75 0 0 1-1.1-1.02l.97-1.047-1.793.793A3.25 3.25 0 0 0 6.5 8.25v.25h2a.75.75 0 0 1 0 1.5h-2v1.5a.75.75 0 0 1-1.5 0V10H3a.75.75 0 0 1 0-1.5h2v-.25a4.75 4.75 0 0 1 2.664-4.27l1.793-.793-.97-1.047a.75.75 0 0 1 1.1-1.02l1.273 1.374a.75.75 0 0 1 0 1.06L9.587 4.927l1.426-1.38z" />
              </svg>
            </button>
            <button
              className="p-1 hover:bg-[#3c3c3c] rounded-sm flex-shrink-0"
              title="Match Case"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#6a6a6a]"
              >
                <path d="M8.854 11.702h-1.35L7.065 9.81H3.219l-.44 1.892H1.43L4.95 3.183h1.512l3.52 8.519zm-2.14-3.183L5.673 5.853 4.632 8.519h2.082zm6.73 3.183V3.183h1.31v8.519h-1.31z" />
              </svg>
            </button>
            <button
              className="p-1 hover:bg-[#3c3c3c] rounded-sm flex-shrink-0"
              title="Match Whole Word"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#6a6a6a]"
              >
                <path d="M0 11h1v2h14v-2h1v3H0v-3zM15 2H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM8 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <button
              className="p-1 hover:bg-[#3c3c3c] rounded-sm flex-shrink-0"
              title="Use Regular Expression"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#6a6a6a]"
              >
                <path d="M10.012 2h.976v3.113l2.56-1.557.976 1.604L11.47 7l3.055 1.84-.976 1.604-2.56-1.557V12h-.976V8.887l-2.56 1.557-.976-1.604L9.53 7 6.475 5.16l.976-1.604 2.56 1.557V2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex text-xs border-b border-[#3c3c3c] overflow-x-auto flex-shrink-0">
          {(
            ["all", "skills", "projects", "experience", "sections"] as const
          ).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2 py-2 capitalize hover:bg-[#2a2d2e] transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedFilter === filter
                  ? "bg-[#37373d] text-[#ffffff] border-b-2 border-[#007acc]"
                  : "text-[#cccccc]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-[#6a6a6a]">
              <div className="animate-spin w-4 h-4 border-2 border-[#007acc] border-t-transparent rounded-full mx-auto mb-2"></div>
              <div className="text-sm">Searching...</div>
            </div>
          ) : searchQuery && results.length === 0 ? (
            <div className="p-4 text-center text-[#6a6a6a]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="mx-auto mb-2 opacity-60"
              >
                <path d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7s2.11-4.7 4.7-4.7 4.7 2.11 4.7 4.7-2.11 4.7-4.7 4.7z" />
              </svg>
              <div className="text-sm">
                No results found for &quot;{searchQuery}&quot;
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-[#cccccc]">
              <div className="text-xs text-[#6a6a6a] mb-2 px-3 py-1 bg-[#2d2d30] border-b border-[#3c3c3c] sticky top-0">
                {results.length} result{results.length !== 1 ? "s" : ""} in{" "}
                {Object.keys(groupedResults).length} file
                {Object.keys(groupedResults).length !== 1 ? "s" : ""}
              </div>

              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center w-full px-2 py-1 text-sm font-medium text-gray-300 hover:bg-gray-600 rounded"
                  >
                    {expandedCategories.has(category) ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                    <span className="ml-1 truncate">
                      {category} ({items.length})
                    </span>
                  </button>

                  {expandedCategories.has(category) && (
                    <div className="ml-4 mt-1">
                      {items.map((result, index) => (
                        <div
                          key={`${result.type}-${index}`}
                          className="p-2 mb-1 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start">
                            <span className="text-lg mr-2 flex-shrink-0">
                              {getTypeIcon(result.type)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate">
                                {result.highlight ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: highlightText(
                                        result.title,
                                        searchQuery,
                                      ),
                                    }}
                                  />
                                ) : (
                                  result.title
                                )}
                              </div>
                              <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                                {result.highlight ? (
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: highlightText(
                                        result.content,
                                        searchQuery,
                                      ),
                                    }}
                                  />
                                ) : (
                                  result.content
                                )}
                              </div>
                              <div className="text-xs text-blue-400 mt-1 capitalize">
                                {result.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-sm mb-2">Search Portfolio</div>
              <div className="text-xs text-gray-500 mb-6">
                Find skills, projects, experience, and more
              </div>

              <div className="text-left max-w-xs mx-auto">
                <div className="text-xs font-medium mb-2">Quick searches:</div>
                <div className="space-y-1">
                  {[
                    "React",
                    "Python",
                    "AI",
                    "Full Stack",
                    "Machine Learning",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="block w-full text-left px-2 py-1 text-xs text-blue-400 hover:bg-gray-600 rounded"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Stats */}
        {searchQuery && (
          <div className="border-t border-[#3c3c3c] p-2 text-xs text-gray-500 flex-shrink-0">
            <div className="truncate">
              Search: &quot;{searchQuery}&quot; • Filter: {selectedFilter} •{" "}
              {results.length} results
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
