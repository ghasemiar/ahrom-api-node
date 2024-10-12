import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const dtoValidationMiddleware = (type: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(type, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const formattedErrors = errors.map(error => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      });
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  };
};
