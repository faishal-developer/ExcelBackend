"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const bookings_validation_1 = require("./bookings.validation");
const bookings_controller_1 = require("./bookings.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/bookings", (0, validateRequests_1.validateRequest)(bookings_validation_1.BookingsZodValidataion.createBooking), (0, Authorization_1.auth)([utils_1.userRoles.user]), bookings_controller_1.BookingsController.createBooking);
router.get("/bookings/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.user]), bookings_controller_1.BookingsController.getSingleBooking);
router.delete("/bookings/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin]), bookings_controller_1.BookingsController.deleteBooking);
router.patch("/bookings/:id", (0, validateRequests_1.validateRequest)(bookings_validation_1.BookingsZodValidataion.updateBooking), (0, Authorization_1.auth)([utils_1.userRoles.admin]), bookings_controller_1.BookingsController.updateBooking);
router.get("/bookings", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.user]), bookings_controller_1.BookingsController.getAllBookings);
exports.BookingRoutes = router;
