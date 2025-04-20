/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, ITicket } from "./ticket.interface";
import { TicketModel } from "./ticket.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { TicketSearchableFields } from "./ticket.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createTicket = async (Ticket: ITicket): Promise<ITicket | null> => {
  const targetTime = new Date(Ticket.timeSlot); // or some specific time
  const twentyMinutesBefore = new Date(targetTime.getTime() - 20 * 60 * 1000);
  const twentyMinutesAfter = new Date(targetTime.getTime() + 20 * 60 * 1000);

  // if any timeslot exist +/-(20 min). it is not valid
  const buses = await TicketModel.find({
    timeSlot: {
      $gte: twentyMinutesBefore,
      $lte: twentyMinutesAfter,
    },
  });
  if(buses.length>0){
    throw new ApiError(httpStatus.CONFLICT, "This time slot is already taken");
  }
  Ticket.bookedSeats=[];
  const result = await TicketModel.create(Ticket);
  return result;
};

const getAllTickets = async (
  queryData: Partial<IQueryData>
): Promise<ITicket[] | null> => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    destination,
    searchTerm,
  } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query:any = {};
  //pricing
  
  //searchTerm
    if (searchTerm) {
        query['$or'] = TicketSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        }))
    };

  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
    sortCondition["timeSlot"] = (sortOrder as TSort) ?? "desc";

  const result = await TicketModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleTicket = async (id: string): Promise<ITicket | null> => {
  const result = await TicketModel.findById({ _id: id });
  return result;
};

const updateTicket = async (
  id: string,
  data: Partial<ITicket>
): Promise<ITicket | null> => {
  const isExist = await TicketModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Ticket not found !");
  }
  if(data.bookedSeats){
    throw new ApiError(httpStatus.METHOD_NOT_ALLOWED, "bookedSeats should not be modified");
  }
  if(data.timeSlot){
    const targetTime = new Date(data.timeSlot); // or some specific time
    const twentyMinutesBefore = new Date(targetTime.getTime() - 20 * 60 * 1000);
    const twentyMinutesAfter = new Date(targetTime.getTime() + 20 * 60 * 1000);

    // if any timeslot exist +/-(20 min). it is not valid
    const buses = await TicketModel.find({
      timeSlot: {
        $gte: twentyMinutesBefore,
        $lte: twentyMinutesAfter,
      },
    });
    if(buses.length>0){
      throw new ApiError(httpStatus.CONFLICT, "This time slot is already taken");
    }
  }
  const result = await TicketModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteTicket = async (id: string): Promise<ITicket | null> => {
  const result = await TicketModel.findByIdAndDelete({ _id: id });
  return result;
};

export const TicketService = {
  createTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
  deleteTicket,
};
