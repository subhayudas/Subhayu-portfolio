/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Ellipsis } from "@/icons";
import { MyWork } from "@/app/layout";
import Header from "./Header";
import Editors from "./Editors";
import Outline from "./Outline";
import Timeline from "./Timeline";
import Scripts from "./Scripts";
import Portfolio from "./Portfolio";

const Explorer = ({ myWork }: { myWork: MyWork[] }) => {
  return (
    <>
      <Header menuTitle="EXPLORER">
        <button className="hover:bg-gray-300 p-1 sm:p-1 rounded-md min-h-[32px] min-w-[32px] flex items-center justify-center">
          <div className="w-4 h-4">
            <Ellipsis />
          </div>
        </button>
      </Header>
      <div
        id="subMenusContainer"
        className="divide-dark_border divide-y-2 flex flex-col mx-[1px] flex-1 select-none"
      >
        <Editors />
        <Portfolio myWork={myWork} />
        <Outline />
        <Timeline />
        <Scripts />
      </div>
    </>
  );
};

export default Explorer;
