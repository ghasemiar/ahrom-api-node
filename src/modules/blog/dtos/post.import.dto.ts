import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostImportDto {
  @Expose()
  @IsString()
  slug: string;
  @Expose()
  @IsString()
  title: string;
  @Expose()
  @IsString()
  content: string;
  @Expose()
  @Transform(({ value }) => value == 'true')
  @IsBoolean()
  isPublish: boolean;
  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    if (value && Array.isArray(value)) {
      return value.map(item => parseInt(item));
    }
    if (value && typeof value === 'string') {
      return [parseInt(value)];
    }
  })
  @IsNumber({}, { each: true })
  categories?: number[];
  @Expose()
  @IsOptional()
  @IsString()
  excerpt?: string;
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;
  @Expose()
  @IsOptional()
  @IsString()
  keywords?: string;
  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    if (value && Array.isArray(value)) {
      return value.map(item => parseInt(item));
    }
    if (value && typeof value === 'string') {
      return [parseInt(value)];
    }
  })
  @IsNumber({}, { each: true })
  tags?: number[];
  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    if (value && Array.isArray(value)) {
      return value.map(item => parseInt(item));
    }
    if (value && typeof value === 'string') {
      return [parseInt(value)];
    }
  })
  @IsNumber({}, { each: true })
  related_post?: number[];
}
export const transformPost = (data: any) => {
  return plainToInstance(PostImportDto, data, {
    excludeExtraneousValues: true,
  });
};
