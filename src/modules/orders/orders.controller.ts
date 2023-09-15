import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { Iorder } from "./orders.interface";
import { OrderService } from "./orders.service";
import { verifyAccessToken } from "../../shared/commonFunction";
import { JwtPayload } from "jsonwebtoken";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cowData: Iorder = req.body;
    const result = await OrderService.createOrder(cowData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await OrderService.getAllOrders();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order retrived successfully",
      data: result,
    });
  }
);

const getSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    const user: JwtPayload = verifyAccessToken(
      req?.headers?.authorization as string
    );
    const result = await OrderService.getSingleOrder(user, orderId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order retrived successfully",
      data: result,
    });
  }
);

export const ordersController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
