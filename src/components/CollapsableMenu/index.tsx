"use client";

import clsx from "clsx";
import Explorer from "./components/Explorer";
import useExpandableStore, { Menu } from "@/lib/store/useExpandableStore";
import { MyWork } from "@/app/layout";

const CollapsableMenu = ({ myWork }: { myWork: MyWork[] }) => {
  const expanded = useExpandableStore((state) => state.value);
  const currentMenu = useExpandableStore((state) => state.menu);

  return (
    <div
      className={clsx(
        !expanded && "hidden",
        "z-10 bg-activity_dark_bg absolute md:static left-full top-0 bottom-0 flex flex-col text-gray-500 border-r-dark_border",
        "w-56 sm:w-64 md:w-72 lg:w-80 xl:min-w-[300px] xl:max-w-[300px]",
      )}
    >
      {currentMenu === Menu.EXPLORER && <Explorer myWork={myWork} />}
    </div>
  );
};

export default CollapsableMenu;
