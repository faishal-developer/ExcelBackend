import { Model, Types } from "mongoose";

export type IFlight = {
    flightNumber:string,
    airline:string,
    origin:string,
    destination:string,
    dateTime:number,
    price:number,
    availableSeats:number,
}

export type IFlightModel = Model<IFlight,Record<string,unknown>>;

export type IQueryData= {
    page?:string,
    limit?:string,
    sortBy?:string,
    sortOrder?:string,
    minPrice?:string,
    maxPrice?:string,
    origin?:string,
    destination?:string,
    searchTerm?:string,
    price?:string
}