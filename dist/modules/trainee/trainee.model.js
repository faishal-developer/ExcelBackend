"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainee = void 0;
const mongoose_1 = require("mongoose");
const TraineeSchema = new mongoose_1.Schema({
    isMember: {
        type: Boolean,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    BookingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Booking'
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Trainee = (0, mongoose_1.model)("Trainee", TraineeSchema);
