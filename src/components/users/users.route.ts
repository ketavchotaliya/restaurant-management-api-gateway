import { Request, Response, Router } from 'express';
import UsersValidations from './users.validation';
import UsersController from './users.controller';
import Authorization from '../../middleware/authorization';

const router = Router();

export default router;
