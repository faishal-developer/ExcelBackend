import { z } from "zod";


const createTrainer = z.object({
  body: z.object({
    userId: z.string({
      required_error: "UserId is required",
    }),
    scheduleId: z.string().optional(),
  }),
});


const updateTrainer = z.object({
  body: z.object({
    userId: z.string().optional(),
    scheduleId: z.string().optional(),
  }),
});


export const TrainersZodValidataion={
    createTrainer,
    updateTrainer
}