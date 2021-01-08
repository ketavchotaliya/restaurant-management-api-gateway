import { Request, Response, Router } from 'express';
import UsersValidations from './users.validation';
import UsersController from './users.controller';
import usersValidation from './users.validation';

const router = Router();

router.post('/api/v1/sign-up', UsersValidations.signup, (req: Request, res: Response) => {
  UsersController.signUp(req, res);
});

router.post('/api/v1/login', usersValidation.login, (req, res, next) => {
  UsersController.login(req, res);
});

export default router;
