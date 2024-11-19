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
exports.FlightsController = void 0;
const catchAsync_1 = require("../../shared/catchAsync");
const http_status_1 = __importDefault(require("http-status"));
const flight_service_1 = require("./flight.service");
const createFlight = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const FlightData = req.body;
    const result = yield flight_service_1.FlightService.createFlight(FlightData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Flight created successfully",
        data: result,
    });
}));
const getAllFlights = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = req.query;
    const result = yield flight_service_1.FlightService.getAllFlights(queryData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Flight retrived successfully",
        data: result,
    });
}));
const getSingleFlight = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield flight_service_1.FlightService.getSingleFlight(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result == null ? "Failed to get" : "Flight retrived successfully",
        data: result,
    });
}));
const updateFlight = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield flight_service_1.FlightService.updateFlight(id, updatedData);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Flight updated succefully",
        data: result,
    });
}));
const deleteFlight = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield flight_service_1.FlightService.deleteFlight(id);
    (0, catchAsync_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Flight deleted successfully!",
        data: result,
    });
}));
exports.FlightsController = {
    createFlight,
    getAllFlights,
    getSingleFlight,
    updateFlight,
    deleteFlight,
};
