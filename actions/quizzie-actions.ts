"use server";
import { z } from 'zod';
import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { createQuizzieformSchema, questionsFormSchema } from '@/schemas';
import { error } from 'console';

export const createQuizzie = async (values: z.infer<typeof createQuizzieformSchema>) => {
    console.log(values);
    const authorId = auth().userId
    if (!authorId) {
        return { error: "Not authorized", success: false, code: 401 }
    } else {

        try {

            const result = await db.quizzie.create({
                data: {
                    name: values.name,
                    description: values.description,
                    type: values.type,
                    timer: parseInt(values.timer),
                    authorId
                }
            })
            return { data: result, success: true, code: 201 }
        } catch (error) {
            console.log(error);
            return { error: "Server Eror", success: false, code: 500 }
        }
    }

}

export const getQuizzie = async (id: string) => {
    try {
        const result = await db.quizzie.findUnique({
            where: {
                id
            },
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }

        });


        return { data: result, success: true, code: 200 }
    } catch (error) {

        return { error: "Error", success: false, code: 500 }
    }
}

export const createQuestion = async (quizzieId: string, values: z.infer<typeof questionsFormSchema>) => {

    try {
        const result = await db.question.create({
            data: {
                content: values.content,
                type: values.type,
                correctAnswer: values.correctAnswer,
                quizzieId,

            }
        })

        values.answers.forEach(async (answer, index) => {
            console.log(answer);
            await db.answer.create({
                data: {
                    content: answer,
                    questionId: result.id
                }
            })
        })


        return { data: result, success: true, code: 201 }
    } catch (error) {
        console.log(error);
        return { error: "Error", success: false, code: 500 }
    }
}


export const getUserQuizzies = async (userId: string) => {
    try {
        const result = await db.quizzie.findMany({
            where: {
                authorId: userId
            },
            include: {

                questions: true


            }
        })

        return { data: result, success: true, code: 200 }
    } catch (error) {
        console.log(error);
        return { error: "Error", success: false, code: 500 }
    }
}