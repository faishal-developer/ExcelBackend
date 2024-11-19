import { z } from "zod";


const createFlight = z.object({
  body: z.object({
    flightNumber: z.string({
      required_error: "flightnumber is require",
    }),
    airline: z.string({
      required_error: "endTime is requireda and should be timestamps",
    }),
    origin: z.string({
      required_error: "price is required",
    }),
    destination:z.string({
      required_error:"destination is required"
    }),
    dateTime:z.number({
      required_error:"dateTime is required"
    }),
    price:z.number({
      required_error:"price is required"
    }),
    availableSeats:z.number({
      required_error:"available setats is required"
    })
  }),
});


const updateFlight = z.object({
  body: z.object({
    flightNumber: z.string().optional(),
    airline: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
    dateTime: z.number().optional(),
    price: z.number().optional(),
    availableSeats: z.number().optional(),
  }),
});


export const FlightsZodValidataion={
    createFlight,
    updateFlight
}