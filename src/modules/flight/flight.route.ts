import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { FlightsZodValidataion } from "./flight.validation";
import { FlightsController } from "./flight.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/flights",
  validateRequest(FlightsZodValidataion.createFlight),
  auth([userRoles.admin]),
  FlightsController.createFlight
);

router.get(
  "/flights/:id", 
  auth([userRoles.admin,userRoles.user]),
  FlightsController.getSingleFlight
);
router.delete(
  "/flights/:id", 
  auth([userRoles.admin]), 
  FlightsController.deleteFlight
);
router.patch(
  "/flights/:id",
  validateRequest(FlightsZodValidataion.updateFlight),
  auth([userRoles.admin]),
  FlightsController.updateFlight
);

router.get(
  "/flights", 
  auth([userRoles.admin,userRoles.user]),
  FlightsController.getAllFlights
);

export const FlightRoutes = router;
