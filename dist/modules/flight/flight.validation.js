"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsZodValidataion = void 0;
const zod_1 = require("zod");
const createFlight = zod_1.z.object({
    body: zod_1.z.object({
        flightNumber: zod_1.z.string({
            required_error: "flightnumber is require",
        }),
        airline: zod_1.z.string({
            required_error: "endTime is requireda and should be timestamps",
        }),
        origin: zod_1.z.string({
            required_error: "price is required",
        }),
        destination: zod_1.z.string({
            required_error: "destination is required"
        }),
        dateTime: zod_1.z.number({
            required_error: "dateTime is required"
        }),
        price: zod_1.z.number({
            required_error: "price is required"
        }),
        availableSeats: zod_1.z.number({
            required_error: "available setats is required"
        })
    }),
});
const updateFlight = zod_1.z.object({
    body: zod_1.z.object({
        flightNumber: zod_1.z.string().optional(),
        airline: zod_1.z.string().optional(),
        origin: zod_1.z.string().optional(),
        destination: zod_1.z.string().optional(),
        dateTime: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        availableSeats: zod_1.z.number().optional(),
    }),
});
exports.FlightsZodValidataion = {
    createFlight,
    updateFlight
};
