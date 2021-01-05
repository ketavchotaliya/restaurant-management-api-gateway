import { Op } from 'sequelize';
import { Order } from '../../environment';
import bcrypt from 'bcrypt';

class UsersHelper {
  async encryptPassword(password = '') {
    return bcrypt.hashSync(password, 10);
  }
}

export default new UsersHelper();
