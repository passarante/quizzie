"use client";
import { createQuestion, getQuizzie } from "@/actions/quizzie-actions";
import QuizzieQuestionList from "@/components/quizzie/QuizzieQuestionList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { answerLetters } from "@/constants";
import { cn } from "@/lib/utils";
import { questionsFormSchema } from "@/schemas";
import { QuestionWithAnswers } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Question, Quizzie } from "@prisma/client";

import { Check, Plus, Trash2 } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const QuizzieEditPage = () => {
  const { id } = useParams();
  const [quizzie, setQuizzie] = useState<Quizzie | null>(null);
  const [questions, setQuestions] = useState<QuestionWithAnswers[] | null>(
    null
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showAddQuestionCard, setShowAddQuestionCard] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof questionsFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(questionsFormSchema),
    defaultValues: {
      content: "",
      type: "single",
      answers: ["", ""],
    },
  });

  useEffect(() => {
    if (id) {
      getQuizzie(id.toString()).then((result) => {
        if (result.success) {
          setQuizzie(result?.data as Quizzie);
          setQuestions(result.data?.questions as QuestionWithAnswers[]);
        }
      });
    }
  }, [id, refresh]);

  const onSubmit = async (values: z.infer<typeof questionsFormSchema>) => {
    if (values.type === "single" && !values.correctAnswer) {
      toast({
        title: "Please select correct answer",
        variant: "destructive",
      });
    }

    const result = await createQuestion(id as string, values);
    if (result.success) {
      toast({ title: "Question created successfully" });
      setShowAddQuestionCard(false);
      setRefresh(!refresh);
      form.reset();
    } else {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
  };

  const addAnswer = () => {
    form.setValue("answers", [...form.getValues("answers"), ""]);
    form.watch("answers");
  };

  const removeAnswer = (index: number) => {
    const newAnswers = [...form.getValues("answers")];
    if (newAnswers.length < 3) {
      toast({
        title: "You must have at least 2 answers",
        variant: "destructive",
      });
    } else {
      const correctAnswer = form.getValues("correctAnswer");
      console.log(correctAnswer);
      const correctAnswerIndex = answerLetters.findIndex(
        (letter) => letter === correctAnswer
      );
      if (correctAnswerIndex === index) {
        form.setValue("correctAnswer", "");
      }
      newAnswers.splice(index, 1);
      form.setValue("answers", newAnswers);
    }
  };

  const setCorrectAnswer = (index: number) => {
    form.setValue("correctAnswer", answerLetters[index]);
    form.watch("correctAnswer");
  };

  return (
    <div>
      {quizzie && (
        <Card>
          <CardHeader>
            <div className="w-full flex items-center space-x-2 pr-2 justify-between">
              <CardTitle className="text-white">{quizzie?.name}</CardTitle>
              <Button
                onClick={() => setShowAddQuestionCard(true)}
                variant={"outline"}
              >
                Add a Question
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p>Description: {quizzie?.description}</p>
            <p>Type: {quizzie?.type}</p>
            <p>
              Total Questions: {questions?.length ?? "No questions added yet"}
            </p>
          </CardContent>
        </Card>
      )}

      {questions && <QuizzieQuestionList questions={questions} />}

      {showAddQuestionCard && (
        <Card className="mt-10">
          <CardHeader>
            <div className="w-full flex items-center space-x-2 pr-2 justify-between">
              <CardTitle className="text-white">Add a Question</CardTitle>
              <Button
                variant={"outline"}
                onClick={() => setShowAddQuestionCard(false)}
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel>Question Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter question content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel>Quizzie Type</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px] my-2">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent className="my-2 w-full">
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="multiple">Multiple</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="bg-slate-900 p-2 rounded-lg my-4">
                  <div className="w-full items-center justify-between flex">
                    <h4>Answers</h4>
                    <Button
                      type="button"
                      onClick={addAnswer}
                      variant={"outline"}
                      size={"sm"}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Answer
                    </Button>
                  </div>
                  {form.getValues().answers.map((answer, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`answers.${index}`}
                      render={({ field }) => (
                        <FormItem className="my-2">
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <span className="flex items-center">
                                {`${answerLetters[index]}:`}
                              </span>
                              <Input
                                {...field}
                                placeholder="Enter answer"
                                className="w-full"
                              />

                              <TooltipProvider>
                                {form.getValues("type") === "single" && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        onClick={() => setCorrectAnswer(index)}
                                        type="button"
                                        className={cn(
                                          "text-gray-200",
                                          form.getValues("correctAnswer") ===
                                            answerLetters[index] &&
                                            "text-green-500"
                                        )}
                                        size={"icon"}
                                        variant={"ghost"}
                                      >
                                        <Check className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Set Correct Answer</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      onClick={() => removeAnswer(index)}
                                      className="text-red-500"
                                      size={"icon"}
                                      variant={"ghost"}
                                      type="button"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Remove answer</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <Button type="submit">Save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizzieEditPage;
