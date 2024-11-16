"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const schedule_model_1 = require("./schedule.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const commonFunction_1 = require("../../shared/commonFunction");
const utils_1 = require("../../utils/utils");
const schedule_constant_1 = require("./schedule.constant");
const createSchedule = (Schedule) => __awaiter(void 0, void 0, void 0, function* () {
    let allSchedule = yield schedule_model_1.ScheduleModel.find({});
    if (allSchedule.length >= 5) {
        throw new ApiError_1.default(405, "Already 5 schedules are created");
    }
    const result = yield schedule_model_1.ScheduleModel.create(Schedule);
    return result;
});
const getAllSchedules = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, limit, sortBy, sortOrder, minPrice = 0, maxPrice = utils_1.maxNumber, location, searchTerm, } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    //searching
    let query = {};
    //pricing
    query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    if (location) {
        query.location = location;
    }
    //searchTerm
    if (searchTerm) {
        query['$or'] = schedule_constant_1.SchedulesSearchableFields.map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: "i",
            },
        }));
    }
    ;
    const sortCondition = {};
    if (sortBy) {
        sortCondition[sortBy] = (_a = sortOrder) !== null && _a !== void 0 ? _a : "asc";
    }
    const result = yield schedule_model_1.ScheduleModel.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    return result;
});
const getSingleSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_model_1.ScheduleModel.findById({ _id: id });
    return result;
});
const updateSchedule = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield schedule_model_1.ScheduleModel.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Schedule not found !");
    }
    const result = yield schedule_model_1.ScheduleModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield schedule_model_1.ScheduleModel.findByIdAndDelete({ _id: id });
    return result;
});
exports.ScheduleService = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
};
