import { Request, Response, Router } from 'express';
import { jwtMiddleware } from '../../middleware/jwtMiddleware';
import RestaurantController from './restaurant.controller';
import RestaurantMiddleware from './restaurant.middleware';

const router = Router();

router.all(
  '/api/*',
  jwtMiddleware.validateJWT,
  RestaurantMiddleware.validateUserRole,
  (req: Request, res: Response) => {
    RestaurantController.callRestaurant_API(req, res);
  }
);

export default router;
