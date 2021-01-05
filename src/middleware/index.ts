import bodyParser from 'body-parser';
import compression from 'compression';
import { Application } from 'express';
import { i18n } from './i18n';
import uuid from './uuid';

export default (app: Application) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(i18n.init);
  app.use(uuid);
};
