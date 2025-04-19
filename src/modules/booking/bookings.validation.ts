import { z } from "zod";


const createBooking = z.object({
  body: z.object({
    userId: z.string({
      required_error: "userId is required",
    }),
    flightId: z.string({
      required_error: "flightId is required",
    }),
    totalPrice: z.number({
      required_error: "totalPrice is required",
    }),
    seatNumber: z.number({
      required_error: "seatNumber is required",
    }),

  }),
});


const updateBooking = z.object({
  body: z.object({
    userId: z.string().optional(),
    flightId: z.string().optional(),
    totalPrice: z.number().optional(),
    seatNumber: z.number().optional(),
    status: z.number().optional()
  }),
});


export const BookingsZodValidataion={
    createBooking,
    updateBooking
}