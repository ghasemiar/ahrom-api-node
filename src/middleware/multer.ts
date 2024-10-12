import * as multer from 'multer';
import { Request } from 'express';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'images/');
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const Upload: multer.Multer = multer({ storage });
