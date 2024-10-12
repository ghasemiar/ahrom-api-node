import { IsString } from 'class-validator';
export class TagCreateDTO {
  @IsString()
  name: string;
}
export class TagUpdateDTO {
  @IsString()
  name: string;
}
