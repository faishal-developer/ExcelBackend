"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = require("../../middleWares/validateRequests");
const trainer_zod_1 = require("./trainer.zod");
const trainer_controller_1 = require("./trainer.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/trainers", (0, validateRequests_1.validateRequest)(trainer_zod_1.TrainersZodValidataion.createTrainer), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainer]), trainer_controller_1.TrainersController.createTrainer);
router.get("/trainers/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainee, utils_1.userRoles.trainer]), trainer_controller_1.TrainersController.getSingleTrainer);
router.delete("/trainers/:id", (0, Authorization_1.auth)([utils_1.userRoles.trainer, utils_1.userRoles.admin]), trainer_controller_1.TrainersController.deleteTrainer);
router.patch("/trainers/:id", (0, validateRequests_1.validateRequest)(trainer_zod_1.TrainersZodValidataion.updateTrainer), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainer]), trainer_controller_1.TrainersController.updateTrainer);
router.get("/trainers", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.trainer, utils_1.userRoles.trainer]), trainer_controller_1.TrainersController.getAllTrainers);
exports.TrainerRoutes = router;
