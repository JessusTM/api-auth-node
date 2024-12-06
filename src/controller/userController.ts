import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { login, register } from "../service/userService";
import { User } from "../domain/User";
import { LoggedUser } from "../domain/LoggedUser";
import { sendResponse } from "../util/sendResponse";
import { validateCredentials } from "../helper/userControllerHelper";
import { generateCookie, removeCookie } from "../util/cookieUtil";

dotenv.config();
const SECRET_KEY = String(process.env.SECRET_KEY);

export const registerUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  try {
    const registeredUser = await register(newUser);
    sendResponse(
      res,
      201,
      "[userController] Usuario registrado correctamente",
      registeredUser,
    );
  } catch (error: any) {
    sendResponse(
      res,
      400,
      `[userControler] No se pudo procesar la solicitud de registro. Detalles: ${error.message}`,
    );
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const credentials = req.body;
  const { email, password } = credentials;
  validateCredentials(res, email, password);

  try {
    const user = await login(email, password);
    const { id, username } = user;
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
    generateCookie(res, token);
    const loggedUser: LoggedUser = {
      id,
      username,
      token,
    };
    sendResponse(
      res,
      200,
      "[userController] Inicio de sesión exitoso",
      loggedUser,
    );
  } catch (error: any) {
    sendResponse(
      res,
      400,
      `[userController] Error al iniciar sesión. Detalles: ${error.message}`,
    );
  }
};

export const logoutUser = async (_req: Request, res: Response) => {
  removeCookie(res);
};
