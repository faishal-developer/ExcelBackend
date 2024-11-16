import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { TrainersZodValidataion } from "./trainer.zod";
import { TrainersController } from "./trainer.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/trainers",
  validateRequest(TrainersZodValidataion.createTrainer),
  auth([userRoles.admin,userRoles.trainer]),
  TrainersController.createTrainer
);

router.get(
  "/trainers/:id", 
  auth([userRoles.admin,userRoles.trainee,userRoles.trainer]),
  TrainersController.getSingleTrainer
);
router.delete(
  "/trainers/:id", 
  auth([userRoles.trainer,userRoles.admin]), 
  TrainersController.deleteTrainer
);
router.patch(
  "/trainers/:id",
  validateRequest(TrainersZodValidataion.updateTrainer),
  auth([userRoles.admin,userRoles.trainer]),
  TrainersController.updateTrainer
);

router.get(
  "/trainers", 
  auth([userRoles.admin,userRoles.trainer,userRoles.trainer]),
  TrainersController.getAllTrainers
);

export const TrainerRoutes = router;
