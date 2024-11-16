import { z } from "zod";


const createTrainee = z.object({
  body: z.object({
    userId: z.string({
      required_error: "Name is required",
    }),
    bookingId: z.string().optional(),
    isMember: z.boolean().optional()
  }),
});


const updateTrainee = z.object({
  body: z.object({
    userId: z.string().optional(),
    bookingId: z.number().optional(),
    isMember: z.number().optional(),
  }),
});


export const TraineesZodValidataion={
    createTrainee,
    updateTrainee
}