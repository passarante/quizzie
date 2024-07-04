import { Answer, Question } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Accordion } from "../ui/accordion";
import QuizzieQuestionCard from "./QuizzieQuestionCard";
import { QuestionWithAnswers } from "@/types";

const QuizzieQuestionList = ({
  questions,
}: {
  questions: QuestionWithAnswers[];
}) => {
  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {questions.map((question) => (
              <QuizzieQuestionCard key={question.id} question={question} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizzieQuestionList;
