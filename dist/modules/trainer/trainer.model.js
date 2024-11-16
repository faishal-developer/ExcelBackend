"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const mongoose_1 = require("mongoose");
const TrainerSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    scheduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Booking'
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Trainer = (0, mongoose_1.model)("Trainer", TrainerSchema);
