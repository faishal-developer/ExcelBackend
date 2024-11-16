import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { TraineesZodValidataion } from "./trainee.zod";
import { TraineesController } from "./trainee.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/trainees",
  validateRequest(TraineesZodValidataion.createTrainee),
  auth([userRoles.trainee]),
  TraineesController.createTrainee
);

router.get(
  "/trainees/:id", 
  auth([userRoles.admin,userRoles.trainee,userRoles.trainer]),
  TraineesController.getSingleTrainee
);
router.delete(
  "/trainees/:id", 
  auth([userRoles.trainee]), 
  TraineesController.deleteTrainee
);
router.patch(
  "/trainees/:id",
  validateRequest(TraineesZodValidataion.updateTrainee),
  auth([userRoles.admin,userRoles.trainee]),
  TraineesController.updateTrainee
);

router.get(
  "/trainees", 
  auth([userRoles.admin,userRoles.trainee,userRoles.trainer]),
  TraineesController.getAllTrainees
);

export const TraineeRoutes = router;
