import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { createResponse, generatePassword } from '../../utils/helper';
import { logger } from '../../utils/logger';
import UsersHelper from './users.helper';
import { UsersModel } from './models';
import usersModel from './models/users.model';
import usersHelper from './users.helper';
import jwtMiddleware from '../../middleware/jwtMiddleware';

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

  async login(req: CustomRequest, res: CustomResponse) {
    try {
      const { email, password } = req.body;

      const findUser = await UsersModel.getSingle({ email });

      if (!findUser) {
        logger.error(__filename, '', 'login', `User with email Id ${email} is not exists!`, {});
        createResponse(res, STATUS_CODES.NOT_FOUND, 'Email or Password mismatch');
        return;
      }

      if (Number(findUser.is_active) === 0) {
        logger.error(__filename, '', 'login', 'User is disable', {});
        createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'User is disabled by admin');
        return;
      }

      // compare user password
      if (!(await usersHelper.comparePassword(password, findUser.password))) {
        logger.error(__filename, '', 'login', 'Email or password is mismatch', {});
        createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Email or password is mismatch');
        return;
      }

      // generate session Id for user
      const sessionId = generatePassword(8);

      // generate JWT for user
      const jwtToken = await jwtMiddleware.generateJWT(findUser.user_id, findUser.email, sessionId, findUser.user_type_id);

      // store sessionId in DB
      await UsersModel.updateOne(
        {
          user_id: findUser.user_id,
        },
        {
          session_id: sessionId,
        }
      );

      let responseObj = {
        user_id: findUser.user_id,
        first_name: findUser.first_name,
        last_name: findUser.last_name,
      };

      createResponse(
        res,
        STATUS_CODES.OK,
        'Login successfully',
        responseObj,
        {},
        {
          Authorization: jwtToken,
        }
      );
    } catch (e) {
      logger.error(__filename, '', 'signUp', `Error in signUp!`, e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error in signUp!');
    }
  }
}

export default new UsersController();
