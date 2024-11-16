import { Schema, model } from "mongoose";
import { ITrinee,TraineeModel } from "./trainee.interface";


const TraineeSchema = new Schema<ITrinee, TraineeModel>(
  {
    isMember: {
      type: Boolean,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    BookingId: {
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

export const Trainee = model<ITrinee, TraineeModel>("Trainee", TraineeSchema);
