import { Model, Types } from "mongoose";

export type ILocation="Dhaka" | "Chattogram" | "Barishal" | "Rajshahi" | "Sylhet" | "Comilla" | "Rangpur" | "Mymensingh";
export type Ibreed = "Brahman"|"Nellore"|"Sahiwal"|"Gir"|"Indigenous"|"Tharparkar"|"Kankrej";
export type Ilabel = 'for sale' | 'sold out';
export type Icategory = "Dairy" | "Beef" | "DualPurpose";

export type Icow = {
    name: string;
    age: number;
    price: number;
    location: ILocation;
    breed: Ibreed;
    weight:number;
    label: Ilabel;
    category: Icategory;
    seller:Types.ObjectId;
}

export type ICowModel = Model<Icow,Record<string,unknown>>;

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