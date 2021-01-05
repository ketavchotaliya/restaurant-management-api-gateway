import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { createResponse, getDefaultSortOrder } from '../../utils/helper';
import { logger } from '../../utils/logger';
import UsersHelper from './users.helper';
import { UsersModel } from './models';

class UsersController {}

export default new UsersController();
