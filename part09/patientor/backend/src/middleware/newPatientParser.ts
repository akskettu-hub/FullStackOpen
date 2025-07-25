import { NextFunction, Request, Response } from "express";
import { newPatientSchema } from "../utils";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse(req.body);
    console.log("Request parsed successfully", req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
