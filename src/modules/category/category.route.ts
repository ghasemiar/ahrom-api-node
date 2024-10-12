import { Router } from 'express';
const router = Router();
import {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
  updateCategory,
  deleteMultipleCategory,
} from './category.controller';
import {
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from './dtos/category.import.dto';
import { dtoValidationMiddleware } from '../../middleware/inputValidation.middleware';
router.get('/category', getCategories);
router.get('/category/:id', getCategory);
router.post(
  '/category',
  dtoValidationMiddleware(CategoryCreateDTO),
  createCategory
);
router.put(
  '/category/:id',
  dtoValidationMiddleware(CategoryUpdateDTO),
  updateCategory
);
router.delete('/category/:id', deleteCategory);
router.delete('/category', deleteMultipleCategory);
export default router;
