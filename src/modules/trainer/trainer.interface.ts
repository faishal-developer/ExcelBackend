import { Model, Types } from "mongoose";

export type ITrainer = {
    userId:Types.ObjectId;
    scheduleId:Types.ObjectId;
}

export type TrainerModel = {
    
} & Model<ITrainer>;

export type IQueryData= {
    page?:string,
    limit?:string,
    sortBy?:string,
    sortOrder?:string,
    searchTerm?:string,
}