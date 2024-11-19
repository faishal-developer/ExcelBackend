/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, IBooking } from "./bookings.interface";
import { BookingModel } from "./bookings.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { BookingsSearchableFields } from "./bookings.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createBooking = async (Booking: IBooking): Promise<IBooking | null> => {
  
  const result = await BookingModel.create(Booking);
  return result;
};

const getAllBookings = async (
  queryData: Partial<IQueryData>
): Promise<IBooking[] | null> => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm,
  } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query:any = {};
  //pricing
  if(location){
    query.location = location;
  }
  //searchTerm
    if (searchTerm) {
        query['$or'] = BookingsSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        }))
    };

  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (sortBy) {
    sortCondition[sortBy] = (sortOrder as TSort) ?? "asc";
  }

  const result = await BookingModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await BookingModel.findById({ _id: id });
  return result;
};

const updateBooking = async (
  id: string,
  data: Partial<IBooking>
): Promise<IBooking | null> => {
  const isExist = await BookingModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking not found !");
  }
  const result = await BookingModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await BookingModel.findByIdAndDelete({ _id: id });
  return result;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
