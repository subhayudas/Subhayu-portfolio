"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "@/icons";
import Header from "./Header";

interface GitCommit {
  id: string;
  message: string;
  author: string;
  date: string;
  hash: string;
  files: number;
}

interface FileChange {
  name: string;
  path: string;
  status: "modified" | "added" | "deleted" | "renamed";
  additions: number;
  deletions: number;
}

const SourceControlPanel = () => {
  const [currentBranch, setCurrentBranch] = useState("main");
  const [branches] = useState([
    "main",
    "develop",
    "feature/search-panel",
    "hotfix/mobile-ui",
  ]);
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [fileChanges] = useState<FileChange[]>([
    {
      name: "TopBar.tsx",
      path: "src/components/TopBar.tsx",
      status: "modified",
      additions: 15,
      deletions: 3,
    },
    {
      name: "SearchPanel.tsx",
      path: "src/components/CollapsableMenu/components/SearchPanel.tsx",
      status: "added",
      additions: 245,
      deletions: 0,
    },
    {
      name: "ActivityBar.tsx",
      path: "src/components/ActivityBar.tsx",
      status: "modified",
      additions: 8,
      deletions: 2,
    },
  ]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["changes", "commits"]),
  );
  const [commitMessage, setCommitMessage] = useState("");
  const [isCommitting, setIsCommitting] = useState(false);

  useEffect(() => {
    // Simulate loading commit history
    const mockCommits: GitCommit[] = [
      {
        id: "1",
        message: "feat: Add search functionality to portfolio",
        author: "Subhayu Das",
        date: new Date().toISOString(),
        hash: "a1b2c3d",
        files: 3,
      },
      {
        id: "2",
        message: "fix: Mobile responsive issues in navigation",
        author: "Subhayu Das",
        date: new Date(Date.now() - 86400000).toISOString(),
        hash: "e4f5g6h",
        files: 2,
      },
      {
        id: "3",
        message: "style: Update color scheme and typography",
        author: "Subhayu Das",
        date: new Date(Date.now() - 172800000).toISOString(),
        hash: "i7j8k9l",
        files: 5,
      },
      {
        id: "4",
        message: "docs: Update README with new features",
        author: "Subhayu Das",
        date: new Date(Date.now() - 259200000).toISOString(),
        hash: "m1n2o3p",
        files: 1,
      },
      {
        id: "5",
        message: "feat: Add dark mode toggle functionality",
        author: "Subhayu Das",
        date: new Date(Date.now() - 345600000).toISOString(),
        hash: "q4r5s6t",
        files: 4,
      },
    ];
    setCommits(mockCommits);
  }, []);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getStatusIcon = (status: FileChange["status"]) => {
    switch (status) {
      case "modified":
        return <span className="text-yellow-400">M</span>;
      case "added":
        return <span className="text-green-400">A</span>;
      case "deleted":
        return <span className="text-red-400">D</span>;
      case "renamed":
        return <span className="text-blue-400">R</span>;
      default:
        return <span className="text-gray-400">?</span>;
    }
  };

  const getCommitTypeColor = (message: string) => {
    if (message.startsWith("feat:")) return "text-green-400";
    if (message.startsWith("fix:")) return "text-red-400";
    if (message.startsWith("docs:")) return "text-blue-400";
    if (message.startsWith("style:")) return "text-purple-400";
    if (message.startsWith("refactor:")) return "text-yellow-400";
    return "text-gray-300";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleCommit = async () => {
    if (!commitMessage.trim()) return;

    setIsCommitting(true);

    // Simulate commit process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newCommit: GitCommit = {
      id: Date.now().toString(),
      message: commitMessage,
      author: "Subhayu Das",
      date: new Date().toISOString(),
      hash: Math.random().toString(36).substring(7),
      files: fileChanges.length,
    };

    setCommits([newCommit, ...commits]);
    setCommitMessage("");
    setIsCommitting(false);
  };

  const syncRepository = () => {
    // Simulate sync animation
    const refreshButton = document.querySelector(".sync-button");
    refreshButton?.classList.add("animate-spin");
    setTimeout(() => {
      refreshButton?.classList.remove("animate-spin");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <Header menuTitle="SOURCE CONTROL">
        <div className="flex gap-1">
          <button
            onClick={syncRepository}
            className="sync-button hover:bg-gray-600 p-1 rounded-sm"
            title="Sync Changes"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3c.789 0 1.57.301 2.165.891l-1.096 1.109h3.5V4.5l-1.096 1.109-.579-.939c-.77-.939-1.934-1.67-3.165-1.67-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4c0-.789-.301-1.57-.891-2.165z" />
            </svg>
          </button>
          <button
            className="hover:bg-gray-600 p-1 rounded-sm"
            title="View History"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1.5A6.5 6.5 0 1 0 8 1.5a6.5 6.5 0 0 0 0 13zM8 3.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 0 1-1.06 1.06L7.47 8.53A.75.75 0 0 1 7.25 8V4A.75.75 0 0 1 8 3.25z" />
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
        {/* Repository Info */}
        <div className="px-3 py-2 border-b border-[#3c3c3c] bg-[#2d2d30] flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-xs min-w-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#007acc] mr-2 flex-shrink-0"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z" />
              </svg>
              <span className="font-medium truncate">
                andrew-portfolio-main
              </span>
            </div>
            <span className="text-xs text-[#6a6a6a] flex-shrink-0 ml-2">
              main
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <div className="w-2 h-2 bg-[#00ff00] rounded-full mr-2 flex-shrink-0"></div>
              <select
                value={currentBranch}
                onChange={(e) => setCurrentBranch(e.target.value)}
                className="bg-[#3c3c3c] text-[#cccccc] text-xs border border-[#3c3c3c] rounded px-2 py-1 focus:outline-none focus:border-[#007acc] min-w-0 max-w-full"
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-[#6a6a6a] flex-shrink-0 ml-2">
              {fileChanges.length} changes
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Changes Section */}
          <div className="border-b border-[#3c3c3c]">
            <button
              onClick={() => toggleSection("changes")}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2d2e] transition-colors"
            >
              {expandedSections.has("changes") ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              <span className="ml-1">Changes ({fileChanges.length})</span>
            </button>

            {expandedSections.has("changes") && (
              <div className="px-3 pb-2">
                {/* Commit Message Input */}
                <div className="mb-3">
                  <textarea
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Commit message..."
                    className="w-full px-2 py-2 text-sm bg-[#3c3c3c] border border-[#3c3c3c] text-[#cccccc] placeholder-[#6a6a6a] focus:outline-none focus:border-[#007acc] rounded resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleCommit}
                    disabled={!commitMessage.trim() || isCommitting}
                    className="mt-2 px-3 py-1 text-sm bg-[#007acc] text-white rounded hover:bg-[#005a9e] disabled:bg-[#6a6a6a] disabled:cursor-not-allowed transition-colors"
                  >
                    {isCommitting ? "Committing..." : "Commit"}
                  </button>
                </div>

                {/* File Changes */}
                <div className="space-y-1">
                  {fileChanges.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-[#2d2d30] rounded hover:bg-[#3c3c3c] cursor-pointer transition-colors"
                    >
                      <div className="w-4 h-4 flex items-center justify-center mr-2 text-xs font-bold flex-shrink-0">
                        {getStatusIcon(file.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-[#cccccc] truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-[#6a6a6a] truncate">
                          {file.path}
                        </div>
                      </div>
                      <div className="text-xs text-[#6a6a6a] flex-shrink-0 ml-2">
                        <span className="text-green-400">
                          +{file.additions}
                        </span>
                        {file.deletions > 0 && (
                          <span className="text-red-400 ml-1">
                            -{file.deletions}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Commits Section */}
          <div>
            <button
              onClick={() => toggleSection("commits")}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2a2d2e] transition-colors"
            >
              {expandedSections.has("commits") ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              <span className="ml-1">Recent Commits ({commits.length})</span>
            </button>

            {expandedSections.has("commits") && (
              <div className="px-3 pb-2">
                <div className="space-y-2">
                  {commits.map((commit) => (
                    <div
                      key={commit.id}
                      className="p-2 bg-[#2d2d30] rounded hover:bg-[#3c3c3c] cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium truncate ${getCommitTypeColor(commit.message)}`}
                          >
                            {commit.message}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xs text-[#6a6a6a] truncate">
                              {commit.author}
                            </div>
                            <div className="text-xs text-[#6a6a6a] flex-shrink-0 ml-2">
                              {formatDate(commit.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <code className="text-xs text-[#569cd6] bg-[#1e1e1e] px-2 py-1 rounded">
                          {commit.hash}
                        </code>
                        <span className="text-xs text-[#6a6a6a]">
                          {commit.files} file{commit.files !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-t border-[#3c3c3c] p-2 text-xs text-[#6a6a6a] bg-[#2d2d30] flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="truncate">Branch: {currentBranch}</span>
            <span className="flex-shrink-0 ml-2">
              {fileChanges.length} pending changes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceControlPanel;
