import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { ScheduleService } from "./schedule.service";
import { ISchedule } from "./schedule.interface";

const createSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ScheduleData: ISchedule = req.body;
    const result = await ScheduleService.createSchedule(ScheduleData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Schedule created successfully",
      data: result,
    });
  }
);

const getAllSchedules = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await ScheduleService.getAllSchedules(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule retrived successfully",
      data: result,
    });
  }
);

const getSingleSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await ScheduleService.getSingleSchedule(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Schedule retrived successfully",
      data: result,
    });
  }
);

const updateSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ScheduleService.updateSchedule(id, updatedData);

    sendResponse<ISchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule updated succefully",
      data: result,
    });
  }
);

const deleteSchedule = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await ScheduleService.deleteSchedule(id);

    sendResponse<ISchedule>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule deleted successfully!",
      data: result,
    });
  }
);

export const SchedulesController = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule,
};
