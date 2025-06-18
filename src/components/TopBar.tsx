"use client";

import {
  ChromeClose,
  ChromeMenu,
  ChromeMinimize,
  ChromeRestore,
  SplitHorizontal,
  SplitVerticalUntoggled,
  ToggledSidebar,
  UntoggledSidebar,
  VSCode,
} from "@/icons";
import { useTogglePortfolio } from "@/lib/hook/useTogglePortfolio";
import useExpandableStore from "@/lib/store/useExpandableStore";
import { useState, useCallback } from "react";

const menuItems = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
];

const menuMessages: Record<string, string> = {
  File: "Trying to open my success stories... but they're too 🔥 to handle!",
  Edit: "Editing skills: 100%. Life choices? Still in beta.",
  Selection: "You selected me. Great choice. You clearly have taste 😎",
  View: "Changing the view won't help you escape my frontend wizardry.",
  Go: "Launching... wait, did you deploy the Job module?",
  Run: "Running my code... If it breaks, it's a feature not a bug 🐞✨",
  Terminal: "Welcome to the terminal. Enter hire me to continue.",
  Help: "Help is on the way! Or maybe not... I'm just a portfolio, not a therapist 💁‍♂️",
};

export default function TopBar() {
  const { value } = useExpandableStore();
  useTogglePortfolio();

  return (
    <div className="flex justify-between text-gray-500 items-center bg-topbar_dark_bg">
      <MenuBar />
      <h1 className="text-sm py-3 pointer-events-none select-none hidden sm:block">
        Subhayu Das - Portfolio
      </h1>
      <div className="flex">
        <ToggleButtons menuExpanded={value} />
        <ControlButtons />
      </div>
    </div>
  );
}

const MenuBar = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const toggleMenu: React.MouseEventHandler<HTMLDivElement> = () => {
    // dispatch(expandableSlice.actions.toggleMenu({ menu: Menu.EXPLORER }));
    // if (!initialLoad) return;
    // dispatch(explorerSlice.actions.setInitialLoad());
    // setTimeout(() => {
    //   dispatch(explorerSlice.actions.toggleMenu({ subMenu: SubMenu.PORTFOLIO }));
    // }, 200);
  };

  const handleMenuClick = useCallback(
    (menuItem: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setActivePopup(menuItem);
      setIsHovered(null);
      // Auto-hide popup after 5 seconds for clicks
      const newTimeoutId = setTimeout(() => {
        setActivePopup(null);
      }, 5000);
      setTimeoutId(newTimeoutId);
    },
    [timeoutId],
  );

  const handleMenuHover = useCallback(
    (menuItem: string) => {
      if (activePopup) return; // Don't show hover popup if click popup is active
      setIsHovered(menuItem);
    },
    [activePopup],
  );

  const handleMenuLeave = useCallback(() => {
    setIsHovered(null);
  }, []);

  const handleClosePopup = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActivePopup(null);
    setIsHovered(null);
  }, [timeoutId]);

  return (
    <div className="p-1 flex relative">
      <div className="my-auto flex items-center px-2">
        <VSCode />
      </div>
      <div className="p-1 ml-2 hidden lg:block">
        {menuItems.map((item) => (
          <button
            key={item}
            className="py-1 px-2 hover:bg-gray-300 rounded-lg cursor-pointer"
            onClick={() => handleMenuClick(item)}
            onMouseEnter={() => handleMenuHover(item)}
            onMouseLeave={handleMenuLeave}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        className="flex items-center ml-4 lg:hidden hover:bg-gray-300 px-4 rounded-md py-2"
        onClick={toggleMenu}
      >
        <ChromeMenu />
      </div>

      {/* Popup */}
      {(activePopup || isHovered) && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
          <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm relative">
            {activePopup && (
              <button
                onClick={handleClosePopup}
                className="absolute top-1 right-2 text-gray-400 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            )}
            <p className={`text-sm ${activePopup ? "pr-4" : ""}`}>
              {menuMessages[activePopup || isHovered || ""]}
            </p>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const toggleButtons = [
  { icon: <SplitVerticalUntoggled /> },
  { icon: <SplitHorizontal /> },
];

const ToggleButtons = ({ menuExpanded }: { menuExpanded: boolean }) => {
  const { toggleMenu } = useExpandableStore();

  return (
    <div className="flex py-2 mx-1">
      {menuExpanded ? (
        <button
          onClick={() => toggleMenu()}
          className="hover:bg-gray-300 p-1 rounded-md"
        >
          <ToggledSidebar />
        </button>
      ) : (
        <button
          onClick={() => toggleMenu()}
          className="hover:bg-gray-300 p-1 rounded-md"
        >
          <UntoggledSidebar />
        </button>
      )}
      {toggleButtons.map((button, index) => (
        <button key={index} className="hover:bg-gray-300 p-1 rounded-md">
          {button.icon}
        </button>
      ))}
    </div>
  );
};

const ControlButtons = () => {
  return (
    <div className="flex">
      <div className="hover:bg-gray-300 p-3 transform duration-300">
        <ChromeMinimize />
      </div>
      <div className="hover:bg-gray-300 p-3 transform duration-300">
        <ChromeRestore />
      </div>
      <div className="hover:bg-red-500 hover:text-white p-3 transform duration-300">
        <ChromeClose />
      </div>
    </div>
  );
};
