import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validateTokenExists } from "../helper/authorizationHelper";
import { sendResponse } from "../util/sendResponse";

dotenv.config();
const SECRET_KEY = String(process.env.SECRET_KEY);

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.access_token;
  validateTokenExists(res, token);

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    sendResponse(res, 403, "[authorization] Token inválido o expirado");
  }
};
