// src/middlewares/validationMiddleware.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T extends Object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const instanceObj = plainToInstance(dtoClass, req.body);

    const errors = await validate(instanceObj, {
      whitelist: true,             
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      validationError: { target: false }  
    });

  if (errors.length > 0) {
  const formattedErrors: Record<string, string> = {};

  errors.forEach(err => {
    const messages = Object.values(err.constraints || {});
    if (messages.length > 0) {
      // Only keep the first message per field (or join them if you prefer)
      formattedErrors[err.property] = messages.join(", ");
    }
  });

  res.status(400).json({ errors: formattedErrors });
  return;
}

    // overwrite body with validated instance
    req.body = instanceObj;
    next();
  };
}
