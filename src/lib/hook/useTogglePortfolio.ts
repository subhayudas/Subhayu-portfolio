"use client";

import { useEffect } from "react";
import useExpandableStore, { Menu } from "../store/useExpandableStore";
import useExplorerStore, { SubMenu } from "../store/useExplorerStore";

export function useTogglePortfolio() {
  const { toggleMenu, closeIfOpen } = useExpandableStore();
  const { toggleMenu: togglePortfolio } = useExplorerStore();

  useEffect(() => {
    const handleInitialLoad = () => {
      if (window.innerWidth < 768) {
        // Ensure activity bar is closed on mobile devices
        closeIfOpen();
        return;
      }
      toggleMenu(Menu.EXPLORER);

      const cleanup = window.requestAnimationFrame(() => {
        togglePortfolio(SubMenu.PORTFOLIO);
      });

      return cleanup;
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Close activity bar when resizing to mobile
        closeIfOpen();
      }
    };

    // Handle initial load
    const cleanup = handleInitialLoad();

    // Add resize listener to handle window resizing
    window.addEventListener("resize", handleResize);

    return () => {
      if (cleanup) {
        window.cancelAnimationFrame(cleanup);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleMenu, togglePortfolio, closeIfOpen]);
}
