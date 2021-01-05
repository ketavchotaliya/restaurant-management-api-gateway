import { Request, Response, Router } from 'express';
import UsersValidations from './users.validation';
import UsersController from './users.controller';
import Authorization from '../../middleware/authorization';
import usersValidation from './users.validation';

const router = Router();

router.post('/sign-up', UsersValidations.signup, (req: Request, res: Response) => {
  UsersController.signUp(req, res);
});

router.post('/login', usersValidation.login, (req, res, next) => {
  UsersController.login(req, res)
})

export default router;
