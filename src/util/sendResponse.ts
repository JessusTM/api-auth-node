import { Response } from "express";

export const sendResponse = (
  res: Response,
  status: number,
  message: string,
  data?: any,
) => {
  res.status(status).json({
    status: status === 200 || status === 201 ? "Éxito" : "Error",
    message,
    ...(typeof data === "object" ? data : { data }),
  });
};
