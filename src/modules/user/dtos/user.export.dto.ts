import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../../types/enums';
export class UserExportDto {
  @Expose()
  name: string;
  @Expose()
  username: string;
  @Exclude()
  password!: string;
  @Exclude()
  role!: UserRole;
  @Expose()
  email: string;
  @Expose()
  phone: string;
}
