import { Model, Types } from "mongoose";

export type IBooking = {
    userId:Types.ObjectId;
    flightId:Types.ObjectId;
    totalPrice:number;
    seatNumber:number;
    status:string;
}

export type IBookingModel = Model<IBooking,Record<string,unknown>>;

export type IQueryData= {
    page?:string,
    limit?:string,
    sortBy?:string,
    sortOrder?:string,
    totalPrice?:number,
    status?:string,
    searchTerm?:string,
}