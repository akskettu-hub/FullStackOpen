import { NextFunction, Request, Response } from "express";
import { idParamSchema, newEntrySchema } from "../utils";

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    idParamSchema.parse(req.params);
    newEntrySchema.parse(req.body);
    console.log("Request parsed successfully", req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
