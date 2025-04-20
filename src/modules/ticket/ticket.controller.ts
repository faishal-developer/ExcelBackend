import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { TicketService } from "./ticket.service";
import { ITicket } from "./ticket.interface";

const createTicket = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const TicketData: ITicket = req.body;
    const result = await TicketService.createTicket(TicketData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Ticket created successfully",
      data: result,
    });
  }
);

const getAllTicket = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await TicketService.getAllTickets(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Ticket retrived successfully",
      data: result,
    });
  }
);

const getSingleTicket = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TicketService.getSingleTicket(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Ticket retrived successfully",
      data: result,
    });
  }
);

const updateTicket = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await TicketService.updateTicket(id, updatedData);

    sendResponse<ITicket>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Ticket updated succefully",
      data: result,
    });
  }
);

const deleteTicket = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await TicketService.deleteTicket(id);

    sendResponse<ITicket>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Ticket deleted successfully!",
      data: result,
    });
  }
);

export const TicketController = {
  createTicket,
  getAllTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
};
