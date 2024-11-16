"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineesZodValidataion = void 0;
const zod_1 = require("zod");
const createTrainee = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "Name is required",
        }),
        bookingId: zod_1.z.string().optional(),
        isMember: zod_1.z.boolean().optional()
    }),
});
const updateTrainee = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        bookingId: zod_1.z.number().optional(),
        isMember: zod_1.z.number().optional(),
    }),
});
exports.TraineesZodValidataion = {
    createTrainee,
    updateTrainee
};
