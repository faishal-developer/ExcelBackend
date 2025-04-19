import { Schema, model } from "mongoose";
import { IBusModel, IBus } from "./bus.interface";


const BusSchema = new Schema<IBus, object>(
  {
    busId: {
      type: String,
      required:true,
      unique:true,
    },
    totalSeat: {
      type: Number,
      required:true
    },
    name: {
      type: String,
      required:true,
    },
    destination: {
      type: String,
      required:true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BusModel = model<IBus,IBusModel>('Bus',BusSchema);