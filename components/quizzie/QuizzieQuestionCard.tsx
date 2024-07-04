import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { QuestionWithAnswers } from "@/types";
import { answerLetters } from "@/constants";
import { cn } from "@/lib/utils";
import { Edit, Edit2, Edit3 } from "lucide-react";
import { Button } from "../ui/button";

const QuizzieQuestionCard = ({
  question,
}: {
  question: QuestionWithAnswers;
}) => {
  return (
    <AccordionItem value={`item-${question.id}`}>
      <AccordionTrigger>{question.content}</AccordionTrigger>
      <AccordionContent>
        {question.answers &&
          question.answers.map((answer, index) => (
            <div
              key={answer.id}
              className="flex w-full items-center justify-between gap-4"
            >
              <p
                className={cn(
                  "my-2 w-full",
                  question.type === "single" &&
                    question.correctAnswer === answerLetters[index] &&
                    "bg-green-500 p-2 rounded"
                )}
              >
                {`${answerLetters[index]} ) `}
                {answer.content}
              </p>
              <Button variant={"ghost"}>
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuizzieQuestionCard;
