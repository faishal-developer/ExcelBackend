import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { BookingsZodValidataion } from "./bookings.validation";
import { BookingsController } from "./bookings.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/bookings",
  validateRequest(BookingsZodValidataion.createBooking),
  auth([userRoles.trainee]),
  BookingsController.createBooking
);

router.get(
  "/bookings/:id", 
  auth([userRoles.admin,userRoles.trainee,userRoles.trainer]),
  BookingsController.getSingleBooking
);
router.delete(
  "/bookings/:id", 
  auth([userRoles.trainee]), 
  BookingsController.deleteBooking
);
router.patch(
  "/bookings/:id",
  validateRequest(BookingsZodValidataion.updateBooking),
  auth([userRoles.trainee]),
  BookingsController.updateBooking
);

router.get(
  "/bookings", 
  auth([userRoles.admin,userRoles.trainee]),
  BookingsController.getAllBookings
);

export const BookingRoutes = router;
