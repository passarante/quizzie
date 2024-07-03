import Navbar from "@/components/global/navbar";
import React, { ReactNode } from "react";

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-black">
      <Navbar />
      <main className="mt-20 p-6">{children}</main>
    </div>
  );
};

export default PagesLayout;
