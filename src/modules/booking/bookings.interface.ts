import { Model, Types } from "mongoose";

export type IBooking = {
    scheduleId:Types.ObjectId;
    userId:Types.ObjectId;
    price:number;
}

export type IBookingModel = Model<IBooking,Record<string,unknown>>;

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