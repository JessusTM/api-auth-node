import { Response } from "express";

export const generateCookie = (res: Response, token: string) => {
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      message: "[cookieUtil] Sesión iniciada, cookie de autenticación creada",
    });
};

export const removeCookie = (res: Response) => {
  res.clearCookie("access_token").status(200).json({
    message: "[cookieUtil] Sesión cerrada, cookie de autenticación eliminada",
  });
};
