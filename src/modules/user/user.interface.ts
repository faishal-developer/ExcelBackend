import { Model, Types } from "mongoose";
import { Type } from "typescript";

export type Irole ='admin' | 'user';
export type IUser = {
    email:string;
    role:Irole;
    password:string;
    name:string;
}

export type UserModel = {
    isUserExist(
        email:string
    ):Promise<Partial<IUser> | null>;
} & Model<IUser>;