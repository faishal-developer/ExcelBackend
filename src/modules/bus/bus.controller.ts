import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { BusService } from "./bus.service";
import { IBus } from "./bus.interface";

const createBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const BusData: IBus = req.body;
    const result = await BusService.createBus(BusData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Bus created successfully",
      data: result,
    });
  }
);

const getAllBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await BusService.getAllBuss(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bus retrived successfully",
      data: result,
    });
  }
);

const getSingleBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BusService.getSingleBus(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Bus retrived successfully",
      data: result,
    });
  }
);

const updateBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BusService.updateBus(id, updatedData);

    sendResponse<IBus>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bus updated succefully",
      data: result,
    });
  }
);

const deleteBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BusService.deleteBus(id);

    sendResponse<IBus>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Bus deleted successfully!",
      data: result,
    });
  }
);

export const BusController = {
  createBus,
  getAllBus,
  getSingleBus,
  updateBus,
  deleteBus,
};
