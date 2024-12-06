import { Response } from "express";

export const validateTokenExists = (res: Response, token: string) => {
  if (!token) {
    return res.status(403).json({
      message: "[authorization] No se encontró token de autenticación",
    });
  }
};
