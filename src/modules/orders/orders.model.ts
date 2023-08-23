import { Schema, model } from "mongoose";
import { IOrderModel, Iorder } from "./orders.interface";

const OrderSchema = new Schema<Iorder, object>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: "Cow",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const OrderModel = model<Iorder, IOrderModel>("Order", OrderSchema);
