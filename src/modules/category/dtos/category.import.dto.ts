import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CategoryCreateDTO {
  @IsString()
  name: string;
  // @IsOptional()
  // @IsNumber()
  // parent: number;
}
export class CategoryUpdateDTO {
  @IsString()
  name: string;
  // @IsOptional()
  // @IsNumber()
  // parentId: number;
}
