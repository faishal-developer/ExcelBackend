"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    scheduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Schedule",
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.BookingModel = (0, mongoose_1.model)('Booking', BookingSchema);
