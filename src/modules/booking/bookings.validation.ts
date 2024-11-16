import { z } from "zod";


const createBooking = z.object({
  body: z.object({
    scheduleId: z.string({
      required_error: "scheduleId is required",
    }),
    userId: z.string({
      required_error: "userId is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),

  }),
});


const updateBooking = z.object({
  body: z.object({
    scheduleId: z.string().optional(),
    userId: z.string().optional(),
    price: z.number().optional()
  }),
});


export const BookingsZodValidataion={
    createBooking,
    updateBooking
}