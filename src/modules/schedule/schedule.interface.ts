import { Model, Types } from "mongoose";

export type ISchedule = {
    startTime:number;
    endTime:number;
    trainerId:Types.ObjectId;
    traineeIds:Types.ObjectId[]
}

export type IScheduleModel = Model<ISchedule,Record<string,unknown>>;

export type IQueryData= {
    page?:string,
    limit?:string,
    sortBy?:string,
    sortOrder?:string,
    minPrice?:string,
    maxPrice?:string,
    location?:string,
    searchTerm?:string,
    price?:string
}