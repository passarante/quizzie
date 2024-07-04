import { Answer, Question } from "@prisma/client";

export interface QuestionWithAnswers extends Question {
    answers: Answer[];
}