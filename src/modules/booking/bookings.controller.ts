import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { BookingService } from "./bookings.service";
import { IBooking } from "./bookings.interface";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const BookingData: IBooking = req.body;
    const result = await BookingService.createBooking(BookingData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  }
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await BookingService.getAllBookings(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrived successfully",
      data: result,
    });
  }
);

const getSingleBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BookingService.getSingleBooking(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Booking retrived successfully",
      data: result,
    });
  }
);

const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BookingService.updateBooking(id, updatedData);

    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated succefully",
      data: result,
    });
  }
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BookingService.deleteBooking(id);

    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully!",
      data: result,
    });
  }
);

export const BookingsController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
