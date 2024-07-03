"use client";
import { createQuizzie } from "@/actions/quizzie-actions";
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50),
  description: z.string(),
  type: z.string(),
  enableTimer: z.string(),
  timer: z.string().default("30"),
});
const CreateQuizziePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      description: "",
      type: "quiz",
      enableTimer: "no",
      timer: "0",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createQuizzie(values);
    if (result.success) {
      toast({
        title: "Quizzie created successfully",
      });

      router.push("/quizzies/edit/" + result?.data?.id);
    }
  };

  return (
    <div>
      <h4 className="text-white">Create New Quizzie</h4>
      <div className=" w-full flex items-center justify-center">
        <Card className="mt-4 w-1/2">
          <CardHeader>
            <CardTitle>
              <p className="text-white ">Quizzie Settings</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel>Quizzie name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter quizzie name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormLabel>Quizzie Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter quizzie description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-2 items-center justify-between">
                  <div>
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
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent className="my-2 w-full">
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="survey">Survey</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="enableTimer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enable Timer</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-[180px] my-2">
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent className="my-2 w-full">
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="yes">Yes</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="timer"
                      disabled={form.getValues("enableTimer") === "no"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timer</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button className="mt-4" variant={"outline"}>
                  Save Quizzie Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateQuizziePage;
