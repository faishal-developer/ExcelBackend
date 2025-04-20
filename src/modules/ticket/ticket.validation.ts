import { z } from "zod";


const createTicket = z.object({
  body: z.object({
    busId: z.string({
      required_error: "busId is require",
    }),
    timeSlot: z.preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg),
      z.date()
    ),
    price: z.number({
      required_error: "price is required",
    })
  }),
});


const updateTicket = z.object({
  body: z.object({
    busId: z.string().optional(),
    timeSlot: z.date().optional(),
    price: z.number().optional()
  }),
});


export const TicketZodValidataion={
    createTicket,
    updateTicket
}