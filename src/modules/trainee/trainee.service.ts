/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, ITrinee } from "./trainee.interface";
import { Trainee } from "./trainee.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { TraineesSearchableFields } from "./trainee.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createTrainee = async (trainee: ITrinee): Promise<ITrinee | null> => {
  
  const result = await Trainee.create(trainee);
  return result;
};

const getAllTrainees = async (
  queryData: Partial<IQueryData>
): Promise<ITrinee[] | null> => {
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
  //searchTerm
    if (searchTerm) {
        query['$or'] = TraineesSearchableFields.map((field) => ({
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

  const result = await Trainee.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleTrainee = async (id: string): Promise<ITrinee | null> => {
  const result = await Trainee.findById({ _id: id });
  return result;
};

const updateTrainee = async (
  id: string,
  data: Partial<ITrinee>
): Promise<ITrinee | null> => {
  const isExist = await Trainee.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainee not found !");
  }
  const result = await Trainee.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteTrainee = async (id: string): Promise<ITrinee | null> => {
  const result = await Trainee.findByIdAndDelete({ _id: id });
  return result;
};

export const TraineeService = {
  createTrainee,
  getAllTrainees,
  getSingleTrainee,
  updateTrainee,
  deleteTrainee,
};
