import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controller/userController";
import { authorization } from "../middleware/authorization";

export const userView = () => {
  const router = Router();
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  router.post("/logout", authorization as any, logoutUser);
  return router;
};
