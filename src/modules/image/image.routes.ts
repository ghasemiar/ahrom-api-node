import { Router } from 'express';
import { getAllImages, deleteImage, uploadImage } from './image.controller';
import { UploadImageDto } from './dtos/image.import.dto';
import { dtoValidationMiddleware } from '../../middleware/inputValidation.middleware';
import { Upload } from '../../middleware/multer';
const router = Router();

router.get('/image', getAllImages);
router.post(
  '/image',
  Upload.fields([{ name: 'image', maxCount: 1 }, { name: 'multiple' }]),
  dtoValidationMiddleware(UploadImageDto),
  uploadImage
);
router.delete('/image/:id', deleteImage);

export default router;
