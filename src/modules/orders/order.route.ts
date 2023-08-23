import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { orderZodValidation } from "./order.validation";
import { ordersController } from "./orders.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/orders",
  validateRequest(orderZodValidation.createOrder),
  auth([userRoles.buyer]),
  ordersController.createOrder
);


router.get(
  "/orders", 
  auth([userRoles.admin]),
  ordersController.getAllOrders
);

export const OrderRoutes = router;
