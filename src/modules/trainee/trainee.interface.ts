import { Model, Types } from "mongoose";

export type ITrinee = {
    isMember:boolean;
    userId:Types.ObjectId;
    BookingId:Types.ObjectId
}

export type TraineeModel = {
    isUserExist(
        phoneNumber:string
    ):Promise<Partial<ITrinee> | null>;
} & Model<ITrinee>;

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