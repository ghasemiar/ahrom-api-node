import { Response, Request } from 'express';
import { imageService } from './image.service';
import StatusCodes from '../../types/statusCodes';

export const getAllImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data, code } = await imageService.getAllImages();
    res.status(code).json({ data });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};
export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as {
      image?: Express.Multer.File[];
      multipleImage?: Express.Multer.File[];
    };
    const image = files?.image[0] || null;
    const multipleImage = files?.multipleImage || null;
    console.log(image);
    const { msg, code } = await imageService.uploadImage(
      req.body.alt,
      image,
      multipleImage
    );
    res.status(code).json({ msg });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};
export const deleteImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { msg, code } = await imageService.deleteImage(Number(id));
    res.status(code).json({ msg });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};
