import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { TraineeService } from "./trainee.service";
import { ITrinee } from "./trainee.interface";

const createTrainee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const TraineeData: ITrinee = req.body;
    const result = await TraineeService.createTrainee(TraineeData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Trainee created successfully",
      data: result,
    });
  }
);

const getAllTrainees = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await TraineeService.getAllTrainees(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Trainee retrived successfully",
      data: result,
    });
  }
);

const getSingleTrainee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TraineeService.getSingleTrainee(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Trainee retrived successfully",
      data: result,
    });
  }
);

const updateTrainee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await TraineeService.updateTrainee(id, updatedData);

    sendResponse<ITrinee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trainee updated succefully",
      data: result,
    });
  }
);

const deleteTrainee = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TraineeService.deleteTrainee(id);

    sendResponse<ITrinee>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trainee deleted successfully!",
      data: result,
    });
  }
);

export const TraineesController = {
  createTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
};
