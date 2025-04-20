import { Model, Types } from "mongoose";

export type IBooking = {
    userId:Types.ObjectId;
    ticketId:Types.ObjectId;
    price:number;
    seatNumber:number;
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