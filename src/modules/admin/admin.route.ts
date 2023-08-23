import express from "express";
import { validateRequest } from "../../middleWares/validateRequests";
import { userZodValidataion } from "../user/user.zod";
import { userController } from "../user/user.controller";

const router = express.Router();

router.post(
  "/admins/create-admin",
  validateRequest(userZodValidataion.createUser),
  userController.createUser
);

router.get("/admins/login", userController.getSingleUser);


export const AdminRoutes = router;
