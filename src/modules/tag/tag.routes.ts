import { Router } from 'express';
const router = Router();
import {
  getTag,
  deleteTag,
  deleteMultipleTag,
  updateTag,
  getAllTag,
  createTag,
} from './tag.controller';

import { dtoValidationMiddleware } from '../../middleware/inputValidation.middleware';
import { TagCreateDTO, TagUpdateDTO } from './dtos/tag.import.dto';
router.get('/tag', getAllTag);
router.get('/tag/:id', getTag);
router.post('/tag', dtoValidationMiddleware(TagCreateDTO), createTag);
router.put('/tag/:id', dtoValidationMiddleware(TagUpdateDTO), updateTag);
router.delete('/tag/:id', deleteTag);
router.delete('/tag', deleteMultipleTag);
export default router;
