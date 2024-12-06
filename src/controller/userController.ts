import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { login, register } from "../service/userService";
import { User } from "../domain/User";
import { LoggedUser } from "../domain/LoggedUser";

dotenv.config();
const SECRET_KEY = String(process.env.SECRET_KEY);

export const registerUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  try {
    const registeredUser = await register(newUser);
    res.status(201).json({
      status: "Éxito",
      message: "[userController] Usuario registrado correctamente",
      user: registeredUser,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: "[userControler] No se pudo procesar la solicitud de registro",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const credentials = req.body;
  const { email, password } = credentials;

  if (!email || !password) {
    res.status(400).json({
      status: "Error",
      message: "[userController] Credenciales vacías",
    });
  }

  try {
    const user = await login(email, password);
    const { id, username } = user;
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
    const loggedUser: LoggedUser = {
      id,
      username,
      token,
    };
    res.status(200).json({
      status: "Éxito",
      message: "[userController] Inicio de sesión exitoso",
      user: loggedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "Error",
      message: `[userController] Error al iniciar sesión`,
      error: error.message,
    });
  }
};
