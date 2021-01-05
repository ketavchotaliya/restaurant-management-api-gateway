import { Request, Response, Router } from 'express';
import UsersValidations from './users.validation';
import UsersController from './users.controller';
import Authorization from '../../middleware/authorization';

const router = Router();

router.post('/sign-up', UsersValidations.signup, (req: Request, res: Response) => {
  UsersController.signUp(req, res);
});

export default router;
