import httpStatus from "http-status";
import ApiError from "../../errorHandler/ApiError";
import { Icow } from "../cow/cow.interface";
import { CowModel } from "../cow/cow.model";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Iorder } from "./orders.interface";
import { OrderModel } from "./orders.model";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

const createOrder = async (order: Iorder): Promise<Iorder | null> => {
  const buyer: IUser | null = await User.findById({ _id: order.buyer });
  const cow: Icow | null = await CowModel.findById({ _id: order.cow });

  if (buyer && cow && (buyer?.budget as number) < cow?.price) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Buyer has not enough money");
    return null;
  } else if (!buyer || !cow) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Buyer or Cow does not exist"
    );
    return null;
  } else if (cow.label === "sold out") {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Cows allready sold out");
    return null;
  }
  let newOrder: Iorder;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const options = { session };
    const newCow: Icow | null = await CowModel.findOneAndUpdate(
      { _id: order.cow },
      { label: "sold out" },
      {
        new: true,
        ...options,
      }
    );
    if (!newCow) {
      throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
    }

    const newBuyer: IUser | null = await User.findOneAndUpdate(
      { _id: order.buyer },
      { budget: (buyer.budget as number) - cow.price },
      {
        new: true,
        ...options,
      }
    );
    if (!newBuyer) {
      throw new ApiError(httpStatus.NOT_FOUND, "Buyer not found");
    }

    const newSeller: IUser | null = await User.findOneAndUpdate(
      { _id: cow.seller },
      {
        $inc: {
          income: cow.price,
        },
      },
      {
        new: true,
        ...options,
      }
    );
    if (!newSeller) {
      throw new ApiError(httpStatus.NOT_FOUND, "Seller not found");
    }

    const newOrders = await OrderModel.create([order], options);
    newOrder = newOrders[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return newOrder;
};

const getAllOrders = async (): Promise<Iorder[] | null> => {
  const result = await OrderModel.find({});
  return result;
};

const getSingleOrder = async (user: JwtPayload, id: string) => {
  const result = await OrderModel.findOne({ _id: id })
    .populate("buyer")
    .populate({
      path: "cow",
      populate: "seller",
    });
  console.log("result", result);
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
