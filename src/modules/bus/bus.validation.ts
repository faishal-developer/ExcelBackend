import { z } from "zod";


const createBus = z.object({
  body: z.object({
    busId: z.string({
      required_error: "busId is require",
    }),
    totalSeat: z.number({
      required_error: "totalSeat is requireda and should be timestamps",
    }),
    name: z.string({
      required_error: "name is required",
    }),
    destination:z.string({
      required_error:"destination is required"
    })
  }),
});


const updateBus = z.object({
  body: z.object({
    busId: z.string().optional(),
    totalSeat: z.number().optional(),
    name: z.string().optional(),
    destination: z.string().optional()
  }),
});


export const BusZodValidataion={
    createBus,
    updateBus
}