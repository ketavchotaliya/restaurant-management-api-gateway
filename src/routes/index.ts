import { Application } from 'express';

import AuthRoute from '../components/Auth';
import RestaurantRoute from '../components/Restaurant';
import ReservationRoute from '../components/Reservation';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Provider Routes
  app.use('/auth', AuthRoute);
  app.use('/restaurant', RestaurantRoute);
  app.use('/reservation', ReservationRoute);
};
