import { userService } from './user.service';
import { Response, Request } from 'express';

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, code, msg, token } = await userService.userLogin(req.body);
    res.status(code).json({ data, msg, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
