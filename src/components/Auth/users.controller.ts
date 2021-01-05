import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { createResponse, getDefaultSortOrder } from '../../utils/helper';
import { logger } from '../../utils/logger';
import UsersHelper from './users.helper';
import { UsersModel } from './models';
import usersModel from './models/users.model';

class UsersController {
  async signUp(req: CustomRequest, res: CustomResponse) {
    try {
      const { first_name, last_name, email, password, user_type } = req.body;

      // find user already registered or not
      const findUser = await UsersModel.getSingle({ email });

      if (findUser) {
        logger.error(__filename, '', 'signUp', `Error in signUp, User with email Id ${email} is already exists!`, {});
        createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'User already exists');
        return;
      }

      const encryptedPassword = await UsersHelper.encryptPassword(password);

      const userObj = {
        first_name,
        last_name,
        email,
        password: encryptedPassword,
        user_type_id: user_type,
      };
      const createUser = await usersModel.addOne(userObj);

      createResponse(res, STATUS_CODES.OK, 'User created successfully');
    } catch (e) {
      logger.error(__filename, '', 'signUp', `Error in signUp!`, e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error in signUp!');
    }
  }
}

export default new UsersController();
