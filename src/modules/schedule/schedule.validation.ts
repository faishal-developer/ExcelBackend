import { z } from "zod";


const createSchedule = z.object({
  body: z.object({
    startTime: z.number({
      required_error: "Starttime is requireda and should be timestamps",
    }),
    endTime: z.number({
      required_error: "endTime is requireda and should be timestamps",
    }),
    trainerId: z.string({
      required_error: "price is required",
    }),
    traineeIds:z.array(z.string().optional()).optional()

  }),
});


const updateSchedule = z.object({
  body: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    trainerId: z.string().optional(),
    traineeIds: z.array(z.string().optional()).optional(),
  }),
});


export const SchedulesZodValidataion={
    createSchedule,
    updateSchedule
}