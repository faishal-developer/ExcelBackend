"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    flightId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.BookingModel = (0, mongoose_1.model)('Booking', BookingSchema);
