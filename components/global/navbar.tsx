"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { userId } = useAuth();
  return (
    <div className="bg-black/80  fixed w-full flex items-center justify-between h-20 p-4 text-white border-b-2 border-slate-800 pb-2 shadow-lg ">
      <span className="shadow-lg text-5xl flex items-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        q<span className="text-white text-xl">uizzie</span>
      </span>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        {userId ? (
          <div>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4">
            <Button variant={"ghost"}>Signin</Button>
            <Button
              variant={"outline"}
              className="text-black dark:bg-white dark:hover:bg-black hover:text-white"
            >
              Signup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
