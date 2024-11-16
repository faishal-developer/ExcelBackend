"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsZodValidataion = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        scheduleId: zod_1.z.string({
            required_error: "scheduleId is required",
        }),
        userId: zod_1.z.string({
            required_error: "userId is required",
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
    }),
});
const updateBooking = zod_1.z.object({
    body: zod_1.z.object({
        scheduleId: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional()
    }),
});
exports.BookingsZodValidataion = {
    createBooking,
    updateBooking
};
