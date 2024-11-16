import { Schema, model } from "mongoose";
import { IScheduleModel, ISchedule } from "./schedule.interface";


const ScheduleSchema = new Schema<ISchedule, object>(
  {
    startTime: {
      type: Number,
      required:true
    },
    endTime: {
      type: Number,
      required:true
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    traineeIds: [{
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
    }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ScheduleModel = model<ISchedule,IScheduleModel>('Schedule',ScheduleSchema);