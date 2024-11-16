"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModel = void 0;
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    trainerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    traineeIds: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ScheduleModel = (0, mongoose_1.model)('Schedule', ScheduleSchema);
