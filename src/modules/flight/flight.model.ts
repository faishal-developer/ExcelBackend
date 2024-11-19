import { Schema, model } from "mongoose";
import { IFlightModel, IFlight } from "./flight.interface";


const FlightSchema = new Schema<IFlight, object>(
  {
    flightNumber: {
      type: String,
      required:true
    },
    airline: {
      type: String,
      required:true
    },
    origin: {
      type: String,
      required:true,
    },
    destination: {
      type: String,
      required:true,
    },
    dateTime:{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    availableSeats:{
      type:Number,
      required:true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const FlightModel = model<IFlight,IFlightModel>('Flight',FlightSchema);