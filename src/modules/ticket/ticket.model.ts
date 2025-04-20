import { Mongoose, Schema, model } from "mongoose";
import { ITicketModel, ITicket } from "./ticket.interface";


const TicketSchema = new Schema<ITicket, object>(
  {
    busId: {
      type: Schema.Types.ObjectId,
      required:true,
      ref:"Bus"
    },
    timeSlot: {
      type: Date,
      required:true
    },
    price: {
      type: Number,
      required:true,
    },
    bookedSeats: {
      type: [Number],
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

export const TicketModel = model<ITicket,ITicketModel>('Ticket',TicketSchema);