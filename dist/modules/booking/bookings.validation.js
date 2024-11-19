"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsZodValidataion = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "userId is required",
        }),
        flightId: zod_1.z.number({
            required_error: "flightId is required",
        }),
        totalPrice: zod_1.z.number({
            required_error: "totalPrice is required",
        }),
        seatNumber: zod_1.z.number({
            required_error: "seatNumber is required",
        }),
    }),
});
const updateBooking = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        flightId: zod_1.z.string().optional(),
        totalPrice: zod_1.z.number().optional(),
        seatNumber: zod_1.z.number().optional(),
        status: zod_1.z.number().optional()
    }),
});
exports.BookingsZodValidataion = {
    createBooking,
    updateBooking
};
