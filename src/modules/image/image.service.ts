import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { myDataSource } from '../../database/typeorm.connection';
import StatusCodes from '../../types/statusCodes';
import * as fs from 'node:fs';
import * as path from 'node:path';

class ImageService {
  private imageRepository: Repository<Image> =
    myDataSource.getRepository(Image);
  async getAllImages(): Promise<{ data: Image[]; code: number }> {
    try {
      const result = await this.imageRepository.find();
      return { data: result, code: StatusCodes.OK };
    } catch (err) {
      console.log(err);
    }
  }
  async uploadImage(
    alt: string,
    image?: Express.Multer.File,
    multipleImage?: Express.Multer.File[]
  ): Promise<{ msg: string; code: number }> {
    try {
      if (image) {
        const newImage = new Image();
        newImage.url = `images/${image.filename}`;
        newImage.alt = alt;
        newImage.name = image.originalname;
        await this.imageRepository.save(newImage);
        return { msg: 'image uploaded successfully', code: StatusCodes.OK };
      }
      if (multipleImage) {
        for (const image of multipleImage) {
          const newImage = new Image();
          newImage.url = `images/${image.filename}`;
          newImage.alt = alt;
          newImage.name = image.originalname;
          await this.imageRepository.save(newImage);
        }
        return {
          msg: 'all images uploaded successfully',
          code: StatusCodes.OK,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteImage(id: number): Promise<{ msg: string; code: number }> {
    try {
      const result = await this.imageRepository.findOneBy({ id });
      if (!result) {
        return { msg: 'no image found', code: StatusCodes.NOT_FOUND };
      }
      const filename = result.url.split('/').pop();
      fs.unlink(path.join(__dirname, '../../../images', filename), err => {
        console.log(err);
      });
      await this.imageRepository.delete(id);
      return { msg: 'image deleted successfully', code: StatusCodes.OK };
    } catch (err) {
      console.log(err);
    }
  }
}
export const imageService = new ImageService();
