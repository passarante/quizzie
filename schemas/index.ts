import * as z from "zod";

export const questionsFormSchema = z.object({
    content: z
        .string()
        .min(20, { message: "Content must be at least 20 characters long" }),
    type: z.string().min(1),
    correctAnswer: z.string().optional(),
    answers: z.array(z.string().min(3)),
});

export const createQuizzieformSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50),
    description: z.string(),
    type: z.string(),
    enableTimer: z.string(),
    timer: z.string().default("30"),
});