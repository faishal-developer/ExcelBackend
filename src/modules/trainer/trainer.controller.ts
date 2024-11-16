import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { TrainerService } from "./trainer.service";
import { ITrainer } from "./trainer.interface";

const createTrainer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const TrainerData: ITrainer = req.body;
    const result = await TrainerService.createTrainer(TrainerData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Trainer created successfully",
      data: result,
    });
  }
);

const getAllTrainers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await TrainerService.getAllTrainers(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Trainer retrived successfully",
      data: result,
    });
  }
);

const getSingleTrainer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TrainerService.getSingleTrainer(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Trainer retrived successfully",
      data: result,
    });
  }
);

const updateTrainer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await TrainerService.updateTrainer(id, updatedData);

    sendResponse<ITrainer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trainer updated succefully",
      data: result,
    });
  }
);

const deleteTrainer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TrainerService.deleteTrainer(id);

    sendResponse<ITrainer>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trainer deleted successfully!",
      data: result,
    });
  }
);

export const TrainersController = {
  createTrainer,
  getAllTrainers,
  getSingleTrainer,
  updateTrainer,
  deleteTrainer,
};
