import { Response } from "express";
import { sendResponse } from "../util/sendResponse";

export const validateCredentials = (
  res: Response,
  email: string,
  password: string,
) => {
  if (!email || !password) {
    sendResponse(res, 400, "[userControllerHelper] Credenciales vacías");
  }
};
