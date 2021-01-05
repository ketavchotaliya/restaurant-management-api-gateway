import bcrypt from 'bcrypt';

class UsersHelper {
  async encryptPassword(password = '') {
    return bcrypt.hashSync(password, 10);
  }

  async comparePassword(password: string, encPassword: any) {
    try {
      return bcrypt.compareSync(password, encPassword);
    } catch (e) {
      throw e;
    }
  }
}

export default new UsersHelper();
