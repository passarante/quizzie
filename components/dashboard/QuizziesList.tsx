"use client";
import { getUserQuizzies } from "@/actions/quizzie-actions";
import { useAuth } from "@clerk/nextjs";
import { Quizzie } from "@prisma/client";
import React, { useEffect, useState } from "react";
import QuizzieCard from "./QuizzieCard";
import { Dot, DotSquare } from "lucide-react";

const QuizziesList = () => {
  const { userId } = useAuth();
  const [quizzies, setQuizzies] = useState<Quizzie[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserQuizzies(userId as string)
      .then((result) => {
        if (result.success) {
          setQuizzies(result.data as Quizzie[]);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className=" w-full h-[calc(100vh-250px)] flex items-center justify-center text-white ">
        <span className="text-4xl mr-2 animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 pb-2">
          Loading...
        </span>{" "}
        <DotSquare className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div>
      {quizzies && quizzies.length === 0 && (
        <div>No Quizzie found. Please create a new one</div>
      )}
      {quizzies && quizzies?.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {quizzies.map((quizzie: Quizzie) => (
            <QuizzieCard quizzie={quizzie} key={quizzie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizziesList;
