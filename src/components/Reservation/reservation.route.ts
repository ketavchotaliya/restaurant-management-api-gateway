import { Request, Response, Router } from 'express';
import { jwtMiddleware } from '../../middleware/jwtMiddleware';
import ReservationController from './reservation.controller';
import ReservationMiddleware from './reservation.middleware';

const router = Router();

router.all(
  '/api/*',
  jwtMiddleware.validateJWT,
  ReservationMiddleware.validateUserRole,
  (req: Request, res: Response) => {
   ReservationController.callReservation_API(req, res);
  }
);

export default router;
