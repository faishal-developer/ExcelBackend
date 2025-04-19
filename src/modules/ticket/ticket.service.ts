/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, IBus } from "./ticket.interface";
import { BusModel } from "./ticket.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { BusSearchableFields } from "./ticket.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createBus = async (Bus: IBus): Promise<IBus | null> => {
  const result = await BusModel.create(Bus);
  return result;
};

const getAllBuss = async (
  queryData: Partial<IQueryData>
): Promise<IBus[] | null> => {
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
        query['$or'] = BusSearchableFields.map((field) => ({
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

  const result = await BusModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleBus = async (id: string): Promise<IBus | null> => {
  const result = await BusModel.findById({ _id: id });
  return result;
};

const updateBus = async (
  id: string,
  data: Partial<IBus>
): Promise<IBus | null> => {
  const isExist = await BusModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Bus not found !");
  }
  const result = await BusModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteBus = async (id: string): Promise<IBus | null> => {
  const result = await BusModel.findByIdAndDelete({ _id: id });
  return result;
};

export const BusService = {
  createBus,
  getAllBuss,
  getSingleBus,
  updateBus,
  deleteBus,
};
