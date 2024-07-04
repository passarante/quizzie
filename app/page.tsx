"use client";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  dark:bg-black/90">
      <Navbar />
      <div className="mt-20 flex flex-1 flex-col gap-4 w-full justify-center items-center bg-gradient-to-br from-slate-900 via-black/80 to-slate-900">
        <h1 className="text-8xl font-bold   bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Quizzie
        </h1>
        <span className="text-white">
          A simple Nextjs quiz and survey generation app
        </span>
        <Link href="/dashboard">
          <Button className="w-80" variant={"outline"}>
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
