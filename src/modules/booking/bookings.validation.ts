import { z } from "zod";


const createBooking = z.object({
  body: z.object({
    userId: z.string({
      required_error: "userId is required",
    }),
    ticketId: z.string({
      required_error: "ticketId is required",
    }),
    price: z.number({
      required_error: "price is required",
    }),
    seatNumber: z.number({
      required_error: "seatNumber is required",
    }),

  }),
});


const updateBooking = z.object({
  body: z.object({
    userId: z.string().optional(),
    ticketId: z.string().optional(),
    price: z.number().optional(),
    seatNumber: z.number().optional(),
  }),
});


export const BookingsZodValidataion={
    createBooking,
    updateBooking
}