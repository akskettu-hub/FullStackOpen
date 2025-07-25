import { NextFunction, Request, Response } from "express";
import z from "zod";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.log(error.issues);
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
    // res.status(400).send({ error: "unkown error" });
  }
};
