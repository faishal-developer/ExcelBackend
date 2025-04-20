import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { BookingsZodValidataion } from "./bookings.validation";
import { BookingsController } from "./bookings.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/tickets/purchase",
  validateRequest(BookingsZodValidataion.createBooking),
  auth([userRoles.user]),
  BookingsController.createBooking
);

router.get(
  "/bookings/:id", 
  auth([userRoles.admin,userRoles.user]),
  BookingsController.getSingleBooking
);
router.delete(
  "/bookings/:id", 
  auth([userRoles.admin]), 
  BookingsController.deleteBooking
);
router.patch(
  "/bookings/:id",
  validateRequest(BookingsZodValidataion.updateBooking),
  auth([userRoles.admin]),
  BookingsController.updateBooking
);

router.get(
  "/bookings", 
  auth([userRoles.admin,userRoles.user]),
  BookingsController.getAllBookings
);

export const BookingRoutes = router;
