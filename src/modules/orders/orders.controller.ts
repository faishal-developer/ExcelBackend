import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { Iorder } from "./orders.interface";
import { OrderService } from "./orders.service";

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


export const ordersController = {
  createOrder,
  getAllOrders,
};
