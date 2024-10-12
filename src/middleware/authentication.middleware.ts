import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../modules/user/entities/user.entity';
import HttpStatus from '../types/statusCodes';
import { UserRole } from '../types/enums';
import { myDataSource } from '../database/typeorm.connection';
import config from '../config';

export interface AuthRequest extends Request {
  user: User;
}
export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token === undefined) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ msg: 'Authentication failed!' });
    }

    const decoded = jwt.verify(token, config.JWT_TOKEN) as {
      userId: string;
      userRule: UserRole;
    };
    const user = await myDataSource.getRepository(User).findOne({
      where: {
        id: Number(decoded.userId),
      },
      // relations: ["profile"],
    });
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({ msg: 'User not found!' });
    }
    // const profile = await myDataSource
    //   .getRepository(Profile)
    //   .findOneBy({ id: user.profile.id });
    // profile.lastSeen = new Date();
    // await myDataSource.getRepository(Profile).save(profile);

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
  }
};
// export const needProfile = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   if (req.user.completeProfile) {
//     next();
//   } else {
//     return res
//       .status(HttpStatus.UNPROCESSABLE_ENTITY)
//       .json({ message: "create a profile first" });
//   }
// };
export const authorizeUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role === UserRole.SUPER_ADMIN) {
    next();
  } else {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: 'Unauthorized access!' });
  }
};
