"use strict";
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
exports.TraineesController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const trainee_service_1 = require("./trainee.service");
const createTrainee = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const TraineeData = req.body;
    const result = yield trainee_service_1.TraineeService.createTrainee(TraineeData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Trainee created successfully",
        data: result,
    });
}));
const getAllTrainees = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = req.query;
    const result = yield trainee_service_1.TraineeService.getAllTrainees(queryData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Trainee retrived successfully",
        data: result,
    });
}));
const getSingleTrainee = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield trainee_service_1.TraineeService.getSingleTrainee(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result == null ? "Failed to get" : "Trainee retrived successfully",
        data: result,
    });
}));
const updateTrainee = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield trainee_service_1.TraineeService.updateTrainee(id, updatedData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trainee updated succefully",
        data: result,
    });
}));
const deleteTrainee = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield trainee_service_1.TraineeService.deleteTrainee(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trainee deleted successfully!",
        data: result,
    });
}));
exports.TraineesController = {
    createTrainee,
    getAllTrainees,
    getSingleTrainee,
    updateTrainee,
    deleteTrainee,
};
