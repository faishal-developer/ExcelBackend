/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, ISchedule } from "./schedule.interface";
import { ScheduleModel } from "./schedule.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { SchedulesSearchableFields } from "./schedule.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createSchedule = async (Schedule: ISchedule): Promise<ISchedule | null> => {
  let allSchedule = await ScheduleModel.find({})
  if(allSchedule.length>=5){
    throw new ApiError(405,"Already 5 schedules are created");
  }
  const result = await ScheduleModel.create(Schedule);
  return result;
};

const getAllSchedules = async (
  queryData: Partial<IQueryData>
): Promise<ISchedule[] | null> => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice = 0,
    maxPrice = maxNumber,
    location,
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
        query['$or'] = SchedulesSearchableFields.map((field) => ({
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

  const result = await ScheduleModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleSchedule = async (id: string): Promise<ISchedule | null> => {
  const result = await ScheduleModel.findById({ _id: id });
  return result;
};

const updateSchedule = async (
  id: string,
  data: Partial<ISchedule>
): Promise<ISchedule | null> => {
  const isExist = await ScheduleModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Schedule not found !");
  }
  const result = await ScheduleModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteSchedule = async (id: string): Promise<ISchedule | null> => {
  const result = await ScheduleModel.findByIdAndDelete({ _id: id });
  return result;
};

export const ScheduleService = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule,
};
