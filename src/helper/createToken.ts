import * as jwt from 'jsonwebtoken';
import { User } from '../modules/user/entities/user.entity';
import config from '../config';

export const generateToken = (user: User): string => {
  return jwt.sign({ userId: user.id, userRole: user.role }, config.JWT_TOKEN, {
    expiresIn: '10h',
  });
};
