import QuizziesList from "@/components/dashboard/QuizziesList";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-white font-bold font-lg">My quizzes</h3>
        <Link href="/quizzies/create">
          <Button>Create New</Button>
        </Link>
      </div>
      <div className="mt-2">
        <QuizziesList />
      </div>
    </div>
  );
};

export default DashboardPage;
