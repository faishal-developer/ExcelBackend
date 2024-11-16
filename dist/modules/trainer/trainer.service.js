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
exports.TrainerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const trainer_model_1 = require("./trainer.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const commonFunction_1 = require("../../shared/commonFunction");
const trainer_constant_1 = require("./trainer.constant");
const createTrainer = (trainer) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_model_1.Trainer.create(trainer);
    return result;
});
const getAllTrainers = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, limit, sortBy, sortOrder, searchTerm, } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    //searching
    let query = {};
    //searchTerm
    if (searchTerm) {
        query['$or'] = trainer_constant_1.TrainersSearchableFields.map((field) => ({
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
    const result = yield trainer_model_1.Trainer.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    return result;
});
const getSingleTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_model_1.Trainer.findById({ _id: id });
    return result;
});
const updateTrainer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield trainer_model_1.Trainer.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Trainer not found !");
    }
    const result = yield trainer_model_1.Trainer.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_model_1.Trainer.findByIdAndDelete({ _id: id });
    return result;
});
exports.TrainerService = {
    createTrainer,
    getAllTrainers,
    getSingleTrainer,
    updateTrainer,
    deleteTrainer,
};
