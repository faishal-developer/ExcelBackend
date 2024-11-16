/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, ITrainer } from "./trainer.interface";
import { Trainer } from "./trainer.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { TrainersSearchableFields } from "./trainer.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createTrainer = async (trainer: ITrainer): Promise<ITrainer | null> => {
  
  const result = await Trainer.create(trainer);
  return result;
};

const getAllTrainers = async (
  queryData: Partial<IQueryData>
): Promise<ITrainer[] | null> => {
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
        query['$or'] = TrainersSearchableFields.map((field) => ({
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

  const result = await Trainer.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleTrainer = async (id: string): Promise<ITrainer | null> => {
  const result = await Trainer.findById({ _id: id });
  return result;
};

const updateTrainer = async (
  id: string,
  data: Partial<ITrainer>
): Promise<ITrainer | null> => {
  const isExist = await Trainer.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found !");
  }
  const result = await Trainer.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteTrainer = async (id: string): Promise<ITrainer | null> => {
  const result = await Trainer.findByIdAndDelete({ _id: id });
  return result;
};

export const TrainerService = {
  createTrainer,
  getAllTrainers,
  getSingleTrainer,
  updateTrainer,
  deleteTrainer,
};
