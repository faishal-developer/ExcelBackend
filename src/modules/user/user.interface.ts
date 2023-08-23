import { Model } from "mongoose";

export type Irole ='seller' | 'buyer' | 'admin';
export type IUser = {
    phoneNumber:string;
    role:Irole;
    password?:string;
    name:{
        firstName:string;
        lastName:string;
    };
    address:string;
    budget?:number;
    income?:number;
}

export type UserModel = {
    isUserExist(
        phoneNumber:string
    ):Promise<Partial<IUser> | null>;
} & Model<IUser>;