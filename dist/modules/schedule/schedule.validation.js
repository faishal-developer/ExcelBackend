"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesZodValidataion = void 0;
const zod_1 = require("zod");
const createSchedule = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.number({
            required_error: "Starttime is requireda and should be timestamps",
        }),
        endTime: zod_1.z.number({
            required_error: "endTime is requireda and should be timestamps",
        }),
        trainerId: zod_1.z.string({
            required_error: "price is required",
        }),
        traineeIds: zod_1.z.array(zod_1.z.string().optional()).optional()
    }),
});
const updateSchedule = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        trainerId: zod_1.z.string().optional(),
        traineeIds: zod_1.z.array(zod_1.z.string().optional()).optional(),
    }),
});
exports.SchedulesZodValidataion = {
    createSchedule,
    updateSchedule
};
