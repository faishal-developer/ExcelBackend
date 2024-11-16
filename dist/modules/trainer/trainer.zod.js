"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersZodValidataion = void 0;
const zod_1 = require("zod");
const createTrainer = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "UserId is required",
        }),
        scheduleId: zod_1.z.string().optional(),
    }),
});
const updateTrainer = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        scheduleId: zod_1.z.string().optional(),
    }),
});
exports.TrainersZodValidataion = {
    createTrainer,
    updateTrainer
};
