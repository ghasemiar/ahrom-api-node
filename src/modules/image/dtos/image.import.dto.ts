import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UploadImageDto {
  @Expose()
  @IsString()
  alt: string;
}
