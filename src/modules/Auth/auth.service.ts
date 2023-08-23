import httpStatus from "http-status";
import ApiError from "../../errorHandler/ApiError";
import { User } from "../user/user.model";
import { AuthServiceresponseType, IAuth, refreshTokenResponse } from "./auth.interface";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreashToken, verifyAccessToken, verifyRefreshToken } from "../../shared/commonFunction";
import { IUser } from "../user/user.interface";

const loginUser = async (payload: IAuth): Promise<AuthServiceresponseType> => {
  const { phoneNumber, password } = payload;
  const isUserExist = await User.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Wrong user or password ");
  }
  const response:Partial<IUser> = {
    phoneNumber:isUserExist.phoneNumber,
    role:isUserExist.role,
    name:isUserExist.name
  }
  const passwordMatched = await bcrypt.compare(
    password,
    isUserExist.password as string
  );
  if (!passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const accessToken = generateAccessToken(response);
  const refreshToken = generateRefreashToken(response);

  return {
    accessToken,
    refreshToken,
    user:response,
  };
};

const refreshToken = async(token:string):Promise<refreshTokenResponse>=>{
    let verifiedToken = null;
    try{
        // verify refresh token
        verifiedToken = verifyRefreshToken(token);
    }catch(error){
        throw new ApiError(httpStatus.FORBIDDEN,"User is not authorized");
    }
    const {phoneNumber} = verifiedToken;
    const isUserExist = await User.isUserExist(phoneNumber);
    if(!isUserExist){
        throw new ApiError(httpStatus.NOT_FOUND, "User is not exist");
    }

    const newAccessToken = generateAccessToken({
      phoneNumber: isUserExist.phoneNumber,
      role: isUserExist.role,
      name: isUserExist.name,
    });

    return {
        accessToken:newAccessToken
    }
}
export const authService={
    loginUser,
    refreshToken
}