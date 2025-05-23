import { Types, ObjectId } from "mongoose";
import { IUser } from "./user.interface";
import { User, role } from "./user.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";
import { verifyAccessToken } from "../../shared/commonFunction";
import { userRoles } from "../../utils/utils";


const createUser = async (user: IUser): Promise<IUser | null> => {
  if(user.role===userRoles.admin){
    throw new ApiError(409,"admin will not be created")
  }

  // const isExist = await User.findOne({
  //   email: user.email,
  // });
  // if (isExist) {
  //   throw new ApiError(409, "Email is allready used");
  // }
  
  const result = await User.create(user);

  const userData = result.toObject();

  return userData;
};

const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  return result;
};

const getMyProfile = async (accessToken: string) => {
  const verifiedUser = verifyAccessToken(accessToken);
  const result = await User.findOne(
    { email: verifiedUser.email },
    "name email address"
  );
  return result;
};

const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const isExist: IUser | null = await User.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  if (
    data.role
  ) {
    throw new ApiError(
      httpStatus.METHOD_NOT_ALLOWED,
      "Role should not be modified"
    );
  }
  const result = await User.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const updateMyProfile = async (
  accessToken: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  if (Object.keys(data).length <= 0) {
    throw new ApiError(404, "No content found to update");
  }
  if (data.email) {
    throw new ApiError(409, "Please don't change email");
  }
  const verifiedUser = verifyAccessToken(accessToken);
  console.log(verifiedUser);

  const isExist: IUser | null = await User.findOne({
    email: verifiedUser.email,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  // if (
  //   isExist.role === "admin" &&
  //   (data.role === role[1] || data.role === role[2])
  // ) {
  //   throw new ApiError(
  //     httpStatus.METHOD_NOT_ALLOWED,
  //     "Admin should not be modified"
  //   );
  // }
  // if (
  //   (isExist.role === role[1] || isExist.role === role[2]) &&
  //   data.role === "admin"
  // ) {
  //   throw new ApiError(
  //     httpStatus.METHOD_NOT_ALLOWED,
  //     "User should not be modified into admin"
  //   );
  // }
  const result = await User.findOneAndUpdate(
    { email: verifiedUser.email },
    data,
    {
      new: true,
    }
  );
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};
export const userService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
