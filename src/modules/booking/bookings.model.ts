import { Schema, model } from "mongoose";
import { IBookingModel, IBooking } from "./bookings.interface";


const BookingSchema = new Schema<IBooking, object>(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required:true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    price: {
      type: Number,
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