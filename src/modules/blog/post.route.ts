import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  getPostBySlug,
  updatePost,
} from './post.controller';
import { dtoValidationMiddleware } from '../../middleware/inputValidation.middleware';
import { PostImportDto } from './dtos/post.import.dto';
import {
  authenticateUser,
  authorizeUser,
} from '../../middleware/authentication.middleware';
import { Upload } from '../../middleware/multer';
const router = Router();
router.get('/post', getAllPost);
router.get('/post/:id', getPost);
router.get('/post/slug/:slug', getPostBySlug);
router.post(
  '/post',
  authenticateUser,
  authorizeUser,
  Upload.single('image'),
  dtoValidationMiddleware(PostImportDto),
  createPost
);
router.put(
  '/post/:id',
  authenticateUser,
  authorizeUser,
  Upload.single('image'),
  dtoValidationMiddleware(PostImportDto),
  updatePost
);
router.delete('/post/:id', deletePost);
export default router;
