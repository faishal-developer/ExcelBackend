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
exports.SchedulesController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const schedule_service_1 = require("./schedule.service");
const createSchedule = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ScheduleData = req.body;
    const result = yield schedule_service_1.ScheduleService.createSchedule(ScheduleData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Schedule created successfully",
        data: result,
    });
}));
const getAllSchedules = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = req.query;
    const result = yield schedule_service_1.ScheduleService.getAllSchedules(queryData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Schedule retrived successfully",
        data: result,
    });
}));
const getSingleSchedule = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield schedule_service_1.ScheduleService.getSingleSchedule(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result == null ? "Failed to get" : "Schedule retrived successfully",
        data: result,
    });
}));
const updateSchedule = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield schedule_service_1.ScheduleService.updateSchedule(id, updatedData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule updated succefully",
        data: result,
    });
}));
const deleteSchedule = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield schedule_service_1.ScheduleService.deleteSchedule(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Schedule deleted successfully!",
        data: result,
    });
}));
exports.SchedulesController = {
    createSchedule,
    getAllSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
};
