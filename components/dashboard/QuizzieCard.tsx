import { Question, Quizzie } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

type QuizzieCardProps = {
  quizzie: Quizzie & { questions?: Question[] };
};

const QuizzieCard = ({ quizzie }: QuizzieCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{quizzie.name}</CardTitle>
          <CardDescription>{quizzie.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <span>{quizzie.questions?.length} questions</span>
            <span>
              <Link href={`/quizzies/edit/${quizzie.id}`}>
                <Button variant={"outline"}>View Details</Button>
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizzieCard;
