import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { FlightService } from "./flight.service";
import { IFlight } from "./flight.interface";

const createFlight = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const FlightData: IFlight = req.body;
    const result = await FlightService.createFlight(FlightData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Flight created successfully",
      data: result,
    });
  }
);

const getAllFlights = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await FlightService.getAllFlights(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Flight retrived successfully",
      data: result,
    });
  }
);

const getSingleFlight = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await FlightService.getSingleFlight(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Flight retrived successfully",
      data: result,
    });
  }
);

const updateFlight = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await FlightService.updateFlight(id, updatedData);

    sendResponse<IFlight>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Flight updated succefully",
      data: result,
    });
  }
);

const deleteFlight = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await FlightService.deleteFlight(id);

    sendResponse<IFlight>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Flight deleted successfully!",
      data: result,
    });
  }
);

export const FlightsController = {
  createFlight,
  getAllFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
};
