import { Schema, model } from "mongoose";
import { AuthModel, IAuth } from "./auth.interface";

const userSchema = new Schema<IAuth, AuthModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      select:false
    }
  }
);

export const authModel = model<IAuth, AuthModel>("User", userSchema);
