import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { cowsZodValidataion } from "./cow.validation";
import { cowsController } from "./cow.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/cows",
  validateRequest(cowsZodValidataion.createCow),
  auth([userRoles.seller]),
  cowsController.createCow
);

router.get(
  "/cows/:id", 
  auth([userRoles.admin,userRoles.buyer,userRoles.admin]),
  cowsController.getSingleCow
);
router.delete(
  "/cows/:id", 
  auth([userRoles.seller]), 
  cowsController.deleteCow
);
router.patch(
  "/cows/:id",
  validateRequest(cowsZodValidataion.updateCow),
  auth([userRoles.seller]),
  cowsController.updateCow
);

router.get(
  "/cows", 
  auth([userRoles.admin,userRoles.buyer,userRoles.seller]),
  cowsController.getAllCows
);

export const CowRoutes = router;
