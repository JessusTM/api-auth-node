import { Router } from "express";
import { loginUser, registerUser } from "../controller/userController";

export const userView = () => {
  const router = Router();
  router.post("/register", registerUser);
  router.post("/login", loginUser);
  return router;
};
