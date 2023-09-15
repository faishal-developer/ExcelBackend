import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { userZodValidataion } from "../user/user.zod";
import { userController } from "../user/user.controller";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";

const router = express.Router();

router.post(
  "/admins/create-admin",
  validateRequest(userZodValidataion.createUser),
  userController.createUser
);
router.get(
  "/admins/my-profile",
  auth([userRoles.admin]),
  userController.getMyProfile
);

router.patch(
  "/admins/my-profile",
  validateRequest(userZodValidataion.updateUser),
  auth([userRoles.admin]),
  userController.updateMyProfile
);

router.get("/admins/login", userController.getSingleUser);

export const AdminRoutes = router;
