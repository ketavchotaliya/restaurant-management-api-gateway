import { NextFunction, Request, Response } from 'express';
import { createValidationResponse } from '../../utils/helper';
import { isEmail, isEmpty } from '../../utils/validator';

class UsersValidations {
  signup(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, email, password, user_type } = req.body;
    const errors: any = {};

    if (isEmpty(first_name)) {
      errors.first_name = res.__('PUBLIC.first_name.required');
    }

    if (isEmpty(last_name)) {
      errors.last_name = res.__('PUBLIC.last_name.required');
    }

    if (isEmpty(email)) {
      errors.email = res.__('PUBLIC.email.required');
    } else if (!isEmail(email)) {
      errors.email = res.__('PUBLIC.email.valid');
    }

    if (isEmpty(password)) {
      errors.password = res.__('PUBLIC.password.required');
    }

    if (isEmpty(user_type)) {
      errors.user_type = res.__('PUBLIC.user_type.required');
    } else if (!isEmpty(user_type) && [1, 2].indexOf(+user_type) === -1) {
      errors.user_type = res.__('PUBLIC.user_type.valid');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }

  login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const errors: any = {};

    if (isEmpty(email)) {
      errors.email = res.__('PUBLIC.email.required');
    } else if (!isEmail(email)) {
      errors.email = res.__('PUBLIC.email.valid');
    }

    if (isEmpty(password)) {
      errors.password = res.__('PUBLIC.password.required');
    }

    if (Object.keys(errors).length > 0) {
      createValidationResponse(res, errors);
    } else {
      next();
    }
  }
}

export default new UsersValidations();
