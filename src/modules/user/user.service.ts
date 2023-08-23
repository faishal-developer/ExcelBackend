import { Types,ObjectId } from "mongoose";
import { IUser } from "./user.interface";
import { User, role } from "./user.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";
import { verifyAccessToken } from "../../shared/commonFunction";


const createUser= async(user:IUser):Promise<IUser|null>=>{
    const result = await User.create(user);
    const userData = result.toObject();
    return userData;
}

const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id:string): Promise<IUser | null> => {
    const result = await User.findById({_id:id});
    return result;
};

const getMyProfile = async (accessToken: string) => {
  const verifiedUser=verifyAccessToken(accessToken);
  const result = await User.findOne({ phoneNumber:verifiedUser.phoneNumber },'name phoneNumber address');
  console.log("working",result);
  return result;
};

const updateUser=async(id:string,data:Partial<IUser>):Promise<IUser | null>=>{
  const isExist:IUser | null = await User.findById({ _id:id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  if(isExist.role==='admin' && (data.role===role[1] || data.role===role[2])){
     throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, "Admin should not be modified");
  }
  if( (isExist.role===role[1] || isExist.role===role[2])&& data.role==='admin'){
     throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, "User should not be modified into admin");
  }
  const result = await User.findOneAndUpdate({ _id:id }, data, {
    new: true,
  });
  return result;
};

const updateMyProfile = async (
  accessToken: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const verifiedUser = verifyAccessToken(accessToken);
  const isExist: IUser | null = await User.findOne({ phoneNumber:verifiedUser.phoneNumber });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  if (
    isExist.role === "admin" &&
    (data.role === role[1] || data.role === role[2])
  ) {
    throw new ApiError(
      httpStatus.METHOD_NOT_ALLOWED,
      "Admin should not be modified"
    );
  }
  if (
    (isExist.role === role[1] || isExist.role === role[2]) &&
    data.role === "admin"
  ) {
    throw new ApiError(
      httpStatus.METHOD_NOT_ALLOWED,
      "User should not be modified into admin"
    );
  }
  const result = await User.findOneAndUpdate({ phoneNumber:verifiedUser.phoneNumber }, data, {
    new: true,
  });
  return result;
};

const deleteUser=async(id:string):Promise<IUser | null>=>{
  const result = await User.findByIdAndDelete({_id:id});
  return result;

}
export const userService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};