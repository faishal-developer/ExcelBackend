import { Schema, model } from "mongoose";
import { IUser, Irole } from "./user.interface";
import { UserModel } from "./user.interface";
import config from "../../config/config";
import bcrypt from "bcrypt";

export const role:Irole[]=["admin","seller", "buyer"];
const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique:true
    },
    role: {
      type: String,
      enum: role, // Specify the enum values here
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      // required: true,
    },
    income: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.statics.isUserExist = async function(
  phoneNumber:string
):Promise<IUser|null>{
  return await User.findOne(
    {phoneNumber},
    {password:1,role:1,name:1,phoneNumber:1}
  )
}
userSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
