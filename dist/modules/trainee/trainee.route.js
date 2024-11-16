"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const trainee_zod_1 = require("./trainee.zod");
const trainee_controller_1 = require("./trainee.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/trainees", (0, validateRequests_1.validateRequest)(trainee_zod_1.TraineesZodValidataion.createTrainee), (0, Authorization_1.auth)([utils_1.userRoles.trainee]), trainee_controller_1.TraineesController.createTrainee);
router.get("/trainees/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainee, utils_1.userRoles.trainer]), trainee_controller_1.TraineesController.getSingleTrainee);
router.delete("/trainees/:id", (0, Authorization_1.auth)([utils_1.userRoles.trainee]), trainee_controller_1.TraineesController.deleteTrainee);
router.patch("/trainees/:id", (0, validateRequests_1.validateRequest)(trainee_zod_1.TraineesZodValidataion.updateTrainee), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainee]), trainee_controller_1.TraineesController.updateTrainee);
router.get("/trainees", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainee, utils_1.userRoles.trainer]), trainee_controller_1.TraineesController.getAllTrainees);
exports.TraineeRoutes = router;
