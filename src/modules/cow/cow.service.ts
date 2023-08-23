/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import { IQueryData, Icow } from "./cow.interface";
import { CowModel } from "./cow.model";
import ApiError from "../../errorHandler/ApiError";
import { calcSkip } from "../../shared/commonFunction";
import { SortOrder } from "mongoose";
import { maxNumber } from "../../utils/utils";
import { CowsSearchableFields } from "./cow.constant";
import { userService } from "../user/user.service";
import { User } from "../user/user.model";

const createCow = async (Cow: Icow): Promise<Icow | null> => {
  const id = Cow.seller;
  const user = await User.findById({_id:id});
  if(user?.role==='buyer'){
    throw new ApiError(httpStatus.NOT_FOUND,"Buyer can't sell a cow");
  }
  const result = await CowModel.create(Cow);
  return result;
};

const getAllCows = async (
  queryData: Partial<IQueryData>
): Promise<Icow[] | null> => {
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
        query['$or'] = CowsSearchableFields.map((field) => ({
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

  const result = await CowModel.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleCow = async (id: string): Promise<Icow | null> => {
  const result = await CowModel.findById({ _id: id });
  return result;
};

const updateCow = async (
  id: string,
  data: Partial<Icow>
): Promise<Icow | null> => {
  const isExist = await CowModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }
  const result = await CowModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<Icow | null> => {
  const result = await CowModel.findByIdAndDelete({ _id: id });
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
