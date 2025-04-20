import mongoose, { Model, mongo, Types } from "mongoose";

export type ITicket = {
    busId:mongoose.Types.ObjectId,
    timeSlot:Date,
    price:number,
    bookedSeats:number[],
}

export type ITicketModel = Model<ITicket,Record<string,unknown>>;

export type IQueryData= {
    page?:string,
    limit?:string,
    sortBy?:string,
    sortOrder?:string,
    destination?:string,
    searchTerm?:string,
}