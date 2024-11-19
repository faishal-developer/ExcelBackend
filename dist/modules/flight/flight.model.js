"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightModel = void 0;
const mongoose_1 = require("mongoose");
const FlightSchema = new mongoose_1.Schema({
    flightNumber: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.FlightModel = (0, mongoose_1.model)('Flight', FlightSchema);
