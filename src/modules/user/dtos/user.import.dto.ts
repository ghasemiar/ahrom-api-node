import { Expose } from 'class-transformer';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { passwordReg } from '../../../types/regexes';

export class UserLoginImportDto {
  @Expose()
  @IsString()
  @MaxLength(16)
  @MinLength(8)
  username: string;
  @Expose()
  @IsString()
  // @Matches(passwordReg)
  password!: string;
}
