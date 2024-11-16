"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const schedule_validation_1 = require("./schedule.validation");
const schedule_controller_1 = require("./schedule.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/schedules", (0, validateRequests_1.validateRequest)(schedule_validation_1.SchedulesZodValidataion.createSchedule), (0, Authorization_1.auth)([utils_1.userRoles.trainee]), schedule_controller_1.SchedulesController.createSchedule);
router.get("/schedules/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainee, utils_1.userRoles.trainer]), schedule_controller_1.SchedulesController.getSingleSchedule);
router.delete("/schedules/:id", (0, Authorization_1.auth)([utils_1.userRoles.trainee]), schedule_controller_1.SchedulesController.deleteSchedule);
router.patch("/schedules/:id", (0, validateRequests_1.validateRequest)(schedule_validation_1.SchedulesZodValidataion.updateSchedule), (0, Authorization_1.auth)([utils_1.userRoles.trainee]), schedule_controller_1.SchedulesController.updateSchedule);
router.get("/schedules", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainee]), schedule_controller_1.SchedulesController.getAllSchedules);
exports.ScheduleRoutes = router;
