import { plainToInstance } from "class-transformer"; 
import { validate } from "class-validator"; 
import { Request, Response, NextFunction } from "express";


export function validationMiddleware<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const instanceObj = plainToInstance(dtoClass, req.body, {
      enableImplicitConversion: true, // important for auto type conversion
    });

    const errors = await validate(instanceObj, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      validationError: { target: false },
    });

    if (errors.length > 0) {
      const formattedErrors: Record<string, string> = {};

      errors.forEach((err) => {
        const messages = Object.values(err.constraints || {});
        if (messages.length > 0) {
          formattedErrors[err.property] = messages.join(", ");
        }
      });

      res.status(400).json({ errors: formattedErrors });
      return;
    }

    // overwrite with plain validated object, not class instance
    req.body = { ...instanceObj };
    next();
  };
}
