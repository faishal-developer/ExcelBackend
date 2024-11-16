import { Schema, model } from "mongoose";
import { ITrainer,TrainerModel } from "./trainer.interface";


const TrainerSchema = new Schema<ITrainer, TrainerModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref:'Booking'
    },
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Trainer = model<ITrainer, TrainerModel>("Trainer", TrainerSchema);
