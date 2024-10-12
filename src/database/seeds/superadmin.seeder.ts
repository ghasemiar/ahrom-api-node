import { User } from '../../modules/user/entities/user.entity';
import { hashedPassword } from '../../helper/hashPassword';
import { myDataSource } from '../typeorm.connection';
import { UserRole } from '../../types/enums';

const superadminSeeder = async () => {
  await myDataSource.initialize();
  const userRepository = myDataSource.getRepository(User);
  const user = new User();
  user.password = await hashedPassword('superadmin');
  user.username = 'superadmin';
  user.role = UserRole.SUPER_ADMIN;
  try {
    await userRepository.save(user);
  } catch (err) {
    throw new Error(err);
  }
  await myDataSource.destroy();
};
superadminSeeder()
  .then(() => console.log('superadmin created succesfully'))
  .catch(err => console.log('there is a problem with superadmin seeder', err));
