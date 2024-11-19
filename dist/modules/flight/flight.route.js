"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const flight_validation_1 = require("./flight.validation");
const flight_controller_1 = require("./flight.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/flights", (0, validateRequests_1.validateRequest)(flight_validation_1.FlightsZodValidataion.createFlight), (0, Authorization_1.auth)([utils_1.userRoles.admin]), flight_controller_1.FlightsController.createFlight);
router.get("/flights/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.user]), flight_controller_1.FlightsController.getSingleFlight);
router.delete("/flights/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin]), flight_controller_1.FlightsController.deleteFlight);
router.patch("/flights/:id", (0, validateRequests_1.validateRequest)(flight_validation_1.FlightsZodValidataion.updateFlight), (0, Authorization_1.auth)([utils_1.userRoles.admin]), flight_controller_1.FlightsController.updateFlight);
router.get("/flights", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.user]), flight_controller_1.FlightsController.getAllFlights);
exports.FlightRoutes = router;
