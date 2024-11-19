/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, IFlight } from "./flight.interface";
import { FlightModel } from "./flight.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { FlightsSearchableFields } from "./flight.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createFlight = async (Flight: IFlight): Promise<IFlight | null> => {
  let allFlight = await FlightModel.find({})
  if(allFlight.length>=5){
    throw new ApiError(405,"Already 5 Flights are created");
  }
  const result = await FlightModel.create(Flight);
  return result;
};

const getAllFlights = async (
  queryData: Partial<IQueryData>
): Promise<IFlight[] | null> => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice = 0,
    maxPrice = maxNumber,
    origin,
    destination,
    price,
    searchTerm,
  } = queryData;
  const pagination = calcSkip(page, limit);

  //searching
  let query:any = {};
  //pricing
  query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  if(location){
    query.location = location;
  }
  //searchTerm
    if (searchTerm) {
        query['$or'] = FlightsSearchableFields.map((field) => ({
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

  const result = await FlightModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleFlight = async (id: string): Promise<IFlight | null> => {
  const result = await FlightModel.findById({ _id: id });
  return result;
};

const updateFlight = async (
  id: string,
  data: Partial<IFlight>
): Promise<IFlight | null> => {
  const isExist = await FlightModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Flight not found !");
  }
  const result = await FlightModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteFlight = async (id: string): Promise<IFlight | null> => {
  const result = await FlightModel.findByIdAndDelete({ _id: id });
  return result;
};

export const FlightService = {
  createFlight,
  getAllFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
};
