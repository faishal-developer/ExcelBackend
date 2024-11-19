import { Schema, model } from "mongoose";
import { IBookingModel, IBooking } from "./bookings.interface";


const BookingSchema = new Schema<IBooking, object>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
   flightId: {
      type: Schema.Types.ObjectId,
      required:true
    },
    totalPrice: {
      type: Number,
      required:true
    },
    seatNumber: {
      type: Number,
      required:true
    },
    status: {
      type: String,
      required:true
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BookingModel = model<IBooking,IBookingModel>('Booking',BookingSchema);