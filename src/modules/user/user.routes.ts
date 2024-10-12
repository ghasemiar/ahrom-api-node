import { loginUser } from './user.controllers';
import { Router } from 'express';
import { dtoValidationMiddleware } from '../../middleware/inputValidation.middleware';
import { UserLoginImportDto } from './dtos/user.import.dto';

const router = Router();

router.post('/login', dtoValidationMiddleware(UserLoginImportDto), loginUser);
export default router;
