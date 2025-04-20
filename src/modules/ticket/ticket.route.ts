import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { TicketZodValidataion } from "./ticket.validation";
import { TicketController } from "./ticket.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/admin/ticket",
  validateRequest(TicketZodValidataion.createTicket),
  auth([userRoles.admin]),
  TicketController.createTicket
);

router.get(
  "/ticket/:id", 
  auth([userRoles.admin,userRoles.user]),
  TicketController.getSingleTicket
);
router.delete(
  "/admin/ticket/:id", 
  auth([userRoles.admin]), 
  TicketController.deleteTicket
);
router.put(
  "/admin/ticket/:id",
  validateRequest(TicketZodValidataion.updateTicket),
  auth([userRoles.admin]),
  TicketController.updateTicket
);

router.get(
  "/ticket", 
  auth([userRoles.admin,userRoles.user]),
  TicketController.getAllTicket
);

export const TicketRoutes = router;
