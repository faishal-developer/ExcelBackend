import { Model, Types } from "mongoose";
import { Type } from "typescript";

export type Irole ='admin' | 'trainer' | 'trainee';
export type IUser = {
    email:string;
    role:Irole;
    password?:string;
    name:{
        firstName:string;
        lastName:string;
    };
    traineeId?:Types.ObjectId;
    trainerId?:Types.ObjectId
}

export type UserModel = {
    isUserExist(
        phoneNumber:string
    ):Promise<Partial<IUser> | null>;
} & Model<IUser>;