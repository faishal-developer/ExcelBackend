import { Schema, model } from "mongoose";
import { ICowModel, Icow } from "./cow.interface";
import { breed, category, level, location } from "./cow.constant";


const CowSchema = new Schema<Icow, object>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: location,
      required: true,
    },
    breed: {
      type: String,
      enum: breed,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: level,
      required: true,
    },
    category: {
      type: String,
      enum: category,
      required: true,
    },
    seller: {
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

export const CowModel = model<Icow,ICowModel>('Cow',CowSchema);