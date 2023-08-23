import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { CowService } from "./cow.service";
import { Icow } from "./cow.interface";


const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cowData:Icow = req.body;
    const result = await CowService.createCow(cowData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Cow created successfully",
      data: result,
    });
  }
);

const getAllCows = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData= req.query;
    const result = await CowService.getAllCows(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cow created successfully",
      data: result,
    });
  }
);

const getSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await CowService.getSingleCow(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Cow retrived successfully",
      data: result,
    });
  }
);

const updateCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await CowService.updateCow(id, updatedData);

    sendResponse<Icow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow updated succefully",
      data: result,
    });
  }
);

const deleteCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await CowService.deleteCow(id);

    sendResponse<Icow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully!",
      data: result,
    });
  }
);

export const cowsController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};