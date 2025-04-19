import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { BusZodValidataion } from "./bus.validation";
import { BusController } from "./bus.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/admin/bus",
  validateRequest(BusZodValidataion.createBus),
  auth([userRoles.admin]),
  BusController.createBus
);

router.get(
  "/bus/:id", 
  auth([userRoles.admin,userRoles.user]),
  BusController.getSingleBus
);
router.delete(
  "/admin/bus/:id", 
  auth([userRoles.admin]), 
  BusController.deleteBus
);
router.put(
  "/admin/bus/:id",
  validateRequest(BusZodValidataion.updateBus),
  auth([userRoles.admin]),
  BusController.updateBus
);

router.get(
  "/bus", 
  auth([userRoles.admin,userRoles.user]),
  BusController.getAllBus
);

export const BusRoutes = router;
