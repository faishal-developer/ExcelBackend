import { Model, Types } from "mongoose";

export type IBus = {
    busId:string,
    totalSeat:number,
    name:string,
    destination:string,
}

export type IBusModel = Model<IBus,Record<string,unknown>>;

export type IQueryData= {
    page?:string,
    limit?:string,
    sortBy?:string,
    sortOrder?:string,
    destination?:string,
    searchTerm?:string,
}