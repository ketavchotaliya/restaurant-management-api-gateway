import { Application } from 'express';

import AuthRoute from './restaurant.route';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Provider Routes
  app.use('/auth', AuthRoute);
};
