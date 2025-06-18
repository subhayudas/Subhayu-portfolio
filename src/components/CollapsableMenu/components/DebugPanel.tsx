"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "@/icons";
import Header from "./Header";

interface DebugVariable {
  name: string;
  value: string | number | boolean | object;
  type: string;
  scope: "local" | "global" | "closure";
}

interface BreakPoint {
  id: string;
  file: string;
  line: number;
  active: boolean;
  condition?: string;
}

interface CallStackFrame {
  function: string;
  file: string;
  line: number;
  column: number;
}

interface ConsoleMessage {
  id: string;
  type: "log" | "warn" | "error" | "info";
  message: string;
  timestamp: string;
  source?: string;
}

const DebugPanel = () => {
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugStatus, setDebugStatus] = useState<
    "stopped" | "running" | "paused"
  >("stopped");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["variables", "console"]),
  );
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const [variables] = useState<DebugVariable[]>([
    {
      name: "currentUser",
      value: { name: "Subhayu Das", role: "Developer" },
      type: "object",
      scope: "global",
    },
    {
      name: "isLoggedIn",
      value: true,
      type: "boolean",
      scope: "local",
    },
    {
      name: "portfolioData",
      value: "Loading...",
      type: "string",
      scope: "local",
    },
    { name: "skillsCount", value: 25, type: "number", scope: "local" },
    { name: "theme", value: "dark", type: "string", scope: "global" },
    { name: "debugMode", value: true, type: "boolean", scope: "closure" },
  ]);

  const [breakpoints] = useState<BreakPoint[]>([
    { id: "1", file: "Portfolio.tsx", line: 42, active: true },
    {
      id: "2",
      file: "Skills.tsx",
      line: 18,
      active: false,
      condition: "skillsCount > 20",
    },
    { id: "3", file: "ContactMe.tsx", line: 15, active: true },
  ]);

  const [callStack] = useState<CallStackFrame[]>([
    {
      function: "handleSubmit",
      file: "ContactMe.tsx",
      line: 15,
      column: 8,
    },
    {
      function: "validateForm",
      file: "utils/validation.ts",
      line: 23,
      column: 12,
    },
    {
      function: "checkEmail",
      file: "utils/validation.ts",
      line: 45,
      column: 5,
    },
    { function: "Portfolio", file: "Portfolio.tsx", line: 42, column: 16 },
  ]);

  useEffect(() => {
    // Initialize with some console messages
    const initialMessages: ConsoleMessage[] = [
      {
        id: "1",
        type: "info",
        message: "🚀 Portfolio application started",
        timestamp: new Date().toLocaleTimeString(),
        source: "Portfolio.tsx:12",
      },
      {
        id: "2",
        type: "log",
        message: "Loading user data...",
        timestamp: new Date().toLocaleTimeString(),
        source: "api/user.ts:8",
      },
      {
        id: "3",
        type: "warn",
        message: "Deprecated API endpoint used in ContactMe component",
        timestamp: new Date().toLocaleTimeString(),
        source: "ContactMe.tsx:28",
      },
    ];
    setConsoleMessages(initialMessages);
  }, []);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleMessages]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const startDebugging = () => {
    setIsDebugging(true);
    setDebugStatus("running");
    addConsoleMessage("info", "🐛 Debug session started");

    // Simulate hitting a breakpoint
    setTimeout(() => {
      setDebugStatus("paused");
      addConsoleMessage("warn", "⏸️ Breakpoint hit at Portfolio.tsx:42");
    }, 2000);
  };

  const stopDebugging = () => {
    setIsDebugging(false);
    setDebugStatus("stopped");
    addConsoleMessage("info", "🛑 Debug session ended");
  };

  const continueDebugging = () => {
    setDebugStatus("running");
    addConsoleMessage("log", "▶️ Continuing execution...");

    // Simulate completion
    setTimeout(() => {
      setDebugStatus("stopped");
      setIsDebugging(false);
      addConsoleMessage("info", "✅ Execution completed");
    }, 1500);
  };

  const stepOver = () => {
    addConsoleMessage("log", "⏭️ Step over executed");
  };

  const stepInto = () => {
    addConsoleMessage("log", "⬇️ Step into executed");
  };

  const addConsoleMessage = (
    type: ConsoleMessage["type"],
    message: string,
    source?: string,
  ) => {
    const newMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      source,
    };
    setConsoleMessages((prev) => [...prev, newMessage]);
  };

  const executeConsoleCommand = () => {
    if (!consoleInput.trim()) return;

    // Add the command to console
    addConsoleMessage("log", `> ${consoleInput}`, "Console");

    // Simulate command execution
    try {
      let result = "";
      const cmd = consoleInput.toLowerCase().trim();

      if (cmd === "help") {
        result =
          "Available commands: help, clear, vars, breakpoints, stack, restart";
      } else if (cmd === "clear") {
        setConsoleMessages([]);
        setConsoleInput("");
        return;
      } else if (cmd === "vars") {
        result = `Variables: ${variables
          .map((v) => `${v.name}=${JSON.stringify(v.value)}`)
          .join(", ")}`;
      } else if (cmd === "breakpoints") {
        result = `Active breakpoints: ${
          breakpoints.filter((b) => b.active).length
        }/${breakpoints.length}`;
      } else if (cmd === "stack") {
        result = `Call stack depth: ${callStack.length} frames`;
      } else if (cmd === "restart") {
        stopDebugging();
        setTimeout(startDebugging, 500);
        result = "Restarting debug session...";
      } else if (cmd.startsWith("eval ")) {
        result = `Evaluating: ${cmd.substring(5)} = [Simulated Result]`;
      } else {
        result = `Unknown command: ${consoleInput}. Type 'help' for available commands.`;
      }

      addConsoleMessage("log", result, "Console");
    } catch (error) {
      addConsoleMessage("error", `Error: ${error}`, "Console");
    }

    setConsoleInput("");
  };

  const getMessageIcon = (type: ConsoleMessage["type"]) => {
    switch (type) {
      case "error":
        return "❌";
      case "warn":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📝";
    }
  };

  const getMessageColor = (type: ConsoleMessage["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-[#cccccc]";
    }
  };

  const formatValue = (value: unknown): string => {
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <Header menuTitle="RUN AND DEBUG">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              debugStatus === "running"
                ? "bg-green-400"
                : debugStatus === "paused"
                  ? "bg-yellow-400"
                  : "bg-gray-400"
            }`}
          />
          <button
            onClick={isDebugging ? stopDebugging : startDebugging}
            className="text-xs px-2 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded"
            title={isDebugging ? "Stop Debugging" : "Start Debugging"}
          >
            {debugStatus === "stopped" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.885.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            ) : debugStatus === "paused" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038L11 7.055a.5.5 0 0 1 0 .89L6.791 9.907a.5.5 0 0 1-.791-.389V5.5a.5.5 0 0 1 .271-.445z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5 6.25a.75.75 0 1 1 1.5 0v3.5a.75.75 0 1 1-1.5 0v-3.5zm4.5 0a.75.75 0 1 1 1.5 0v3.5a.75.75 0 1 1-1.5 0v-3.5z" />
              </svg>
            )}
          </button>

          {debugStatus === "paused" && (
            <div className="flex gap-1">
              <button
                onClick={continueDebugging}
                className="hover:bg-gray-600 p-1 rounded-sm text-green-400"
                title="Continue"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.885.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z" />
                </svg>
              </button>

              <button
                onClick={stepOver}
                className="hover:bg-gray-600 p-1 rounded-sm"
                title="Step Over"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z" />
                </svg>
              </button>

              <button
                onClick={stepInto}
                className="hover:bg-gray-600 p-1 rounded-sm"
                title="Step Into"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Header>

      <div className="flex flex-col flex-1 text-sm bg-[#252526] text-[#cccccc] overflow-hidden">
        {/* Debug Status */}
        <div className="px-3 py-2 border-b border-[#3c3c3c] bg-[#2d2d30] flex-shrink-0">
          <div
            className={`text-xs font-medium ${
              debugStatus === "running"
                ? "text-green-400"
                : debugStatus === "paused"
                  ? "text-yellow-400"
                  : "text-gray-400"
            }`}
          >
            Status:{" "}
            {debugStatus === "running"
              ? "Running"
              : debugStatus === "paused"
                ? "Paused"
                : "Stopped"}
          </div>
          <div className="text-xs text-[#6a6a6a] mt-1">
            {isDebugging ? "Debug Active" : "Ready to Debug"}
          </div>
        </div>

        {/* Debug Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Variables Section */}
          <div className="border-b border-[#3c3c3c]">
            <button
              onClick={() => toggleSection("variables")}
              className="w-full flex items-center px-3 py-2 text-xs font-medium text-[#cccccc] hover:bg-[#2a2d2e] transition-colors"
            >
              {expandedSections.has("variables") ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              <span className="ml-2">VARIABLES</span>
            </button>
            {expandedSections.has("variables") && (
              <div className="px-3 pb-2">
                {variables.map((variable, index) => (
                  <div
                    key={index}
                    className="mb-2 p-2 bg-[#2d2d30] rounded text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#9cdcfe]">
                        {variable.name}
                      </span>
                      <span className="text-[#6a6a6a] text-xs">
                        {variable.scope}
                      </span>
                    </div>
                    <div className="text-[#ce9178] font-mono text-xs break-all">
                      {formatValue(variable.value)}
                    </div>
                    <div className="text-[#4ec9b0] text-xs mt-1">
                      {variable.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call Stack Section */}
          <div className="border-b border-[#3c3c3c]">
            <button
              onClick={() => toggleSection("callstack")}
              className="w-full flex items-center px-3 py-2 text-xs font-medium text-[#cccccc] hover:bg-[#2a2d2e] transition-colors"
            >
              {expandedSections.has("callstack") ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              <span className="ml-2">CALL STACK</span>
            </button>
            {expandedSections.has("callstack") && (
              <div className="px-3 pb-2">
                {callStack.map((frame, index) => (
                  <div
                    key={index}
                    className="mb-1 p-2 bg-[#2d2d30] rounded text-xs hover:bg-[#3c3c3c] cursor-pointer transition-colors"
                  >
                    <div className="font-medium text-[#dcdcaa]">
                      {frame.function}
                    </div>
                    <div className="text-[#6a6a6a] text-xs">
                      {frame.file}:{frame.line}:{frame.column}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Breakpoints Section */}
          <div className="border-b border-[#3c3c3c]">
            <button
              onClick={() => toggleSection("breakpoints")}
              className="w-full flex items-center px-3 py-2 text-xs font-medium text-[#cccccc] hover:bg-[#2a2d2e] transition-colors"
            >
              {expandedSections.has("breakpoints") ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              <span className="ml-2">BREAKPOINTS</span>
            </button>
            {expandedSections.has("breakpoints") && (
              <div className="px-3 pb-2">
                {breakpoints.map((bp) => (
                  <div
                    key={bp.id}
                    className="mb-1 p-2 bg-[#2d2d30] rounded text-xs hover:bg-[#3c3c3c] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          bp.active ? "bg-red-400" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-[#cccccc]">
                        {bp.file}:{bp.line}
                      </span>
                    </div>
                    {bp.condition && (
                      <div className="text-[#6a6a6a] text-xs mt-1">
                        {/* Toggle breakpoint */}
                        Condition: {bp.condition}
                      </div>
                    )}
                    <button
                      className="text-xs text-[#6a6a6a] hover:text-[#cccccc] mt-1"
                      onClick={() => {
                        /* Toggle breakpoint logic */
                      }}
                    >
                      {bp.active ? "●" : "○"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Debug Console Section */}
          <div>
            <button
              onClick={() => toggleSection("console")}
              className="w-full flex items-center px-3 py-2 text-xs font-medium text-[#cccccc] hover:bg-[#2a2d2e] transition-colors"
            >
              {expandedSections.has("console") ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
              <span className="ml-2">
                Debug Console ({consoleMessages.length})
              </span>
            </button>
            {expandedSections.has("console") && (
              <div className="px-3 pb-2">
                <div className="max-h-40 overflow-y-auto mb-2">
                  {consoleMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="mb-1 p-2 bg-[#1e1e1e] rounded text-xs hover:bg-[#2d2d30] transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0">
                          {getMessageIcon(msg.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`${getMessageColor(msg.type)} break-words`}
                          >
                            {msg.message}
                          </div>
                          {msg.source && (
                            <div className="text-[#6a6a6a] text-xs mt-1">
                              {msg.timestamp}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>

                {/* Console Input */}
                <div className="flex items-center gap-2">
                  <span className="text-[#6a6a6a] text-xs">&gt;</span>
                  <input
                    type="text"
                    value={consoleInput}
                    onChange={(e) => setConsoleInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && executeConsoleCommand()
                    }
                    placeholder="Evaluate expression or type 'help'"
                    className="flex-1 bg-transparent text-xs text-[#cccccc] placeholder-[#6a6a6a] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
