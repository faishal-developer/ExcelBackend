import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import { AuthServiceresponseType } from "./auth.interface";
import config from "../../config/config";
import { IUser } from "../user/user.interface";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginData = req.body;
    const {refreshToken,...others} = await authService.loginUser(loginData);

    const cookieOptions={
        secure:config.env==='production',
        httpOnly:true,
    }
    console.log("testing");
    
    res.cookie('refreshToken',refreshToken,cookieOptions);
    delete others.user?.password;
    sendResponse<Partial<AuthServiceresponseType>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${others.user?.role==='admin'?"Admin":'User'} logged in successfully`,
      data: {
        accessToken:others.accessToken,
        user:others.user as Partial<IUser>
      },
    });
  }
);

const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    const result = await authService.refreshToken(refreshToken);
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Access token created successfully !",
      data: result,
    });
  }
);



export const authController = {
  login,
  refreshToken,
};
