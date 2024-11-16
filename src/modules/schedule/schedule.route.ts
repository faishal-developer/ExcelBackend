import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { SchedulesZodValidataion } from "./schedule.validation";
import { SchedulesController } from "./schedule.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/schedules",
  validateRequest(SchedulesZodValidataion.createSchedule),
  auth([userRoles.trainee]),
  SchedulesController.createSchedule
);

router.get(
  "/schedules/:id", 
  auth([userRoles.admin,userRoles.trainee,userRoles.trainer]),
  SchedulesController.getSingleSchedule
);
router.delete(
  "/schedules/:id", 
  auth([userRoles.trainee]), 
  SchedulesController.deleteSchedule
);
router.patch(
  "/schedules/:id",
  validateRequest(SchedulesZodValidataion.updateSchedule),
  auth([userRoles.trainee]),
  SchedulesController.updateSchedule
);

router.get(
  "/schedules", 
  auth([userRoles.admin,userRoles.trainee]),
  SchedulesController.getAllSchedules
);

export const ScheduleRoutes = router;
