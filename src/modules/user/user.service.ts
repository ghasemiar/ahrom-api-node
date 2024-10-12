import { myDataSource } from '../../database/typeorm.connection';
import { User } from './entities/user.entity';
import { UserLoginImportDto } from './dtos/user.import.dto';
import { generateToken } from '../../helper/createToken';
import * as bcrypt from 'bcrypt';
import statusCodes from '../../types/statusCodes';

class UserService {
  private userRepository = myDataSource.getRepository(User);
  async userLogin(data: UserLoginImportDto) {
    try {
      //check if user not exist
      const findUser: User | null = await this.userRepository.findOneBy({
        username: data.username,
      });
      if (!findUser) {
        return {
          msg: 'user not found',
          code: statusCodes.NOT_FOUND,
          data: data,
        };
      }
      //check user password
      const isValidPassword = await bcrypt.compare(
        data.password,
        findUser.password
      );
      if (!isValidPassword) {
        return { msg: 'invalid password', code: statusCodes.UNAUTHORIZED };
      }
      const token = generateToken(findUser);
      return {
        msg: 'welcome back',
        code: statusCodes.OK,
        token: token,
        data: findUser,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err,
        msg: 'you have an error when try login',
        code: statusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const userService = new UserService();
