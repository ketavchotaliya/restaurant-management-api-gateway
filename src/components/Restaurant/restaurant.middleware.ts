import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../../environment';
import { ROLES } from '../../utils/constants';
import { createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';

class RestaurantMiddleware {
  async validateUserRole(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      if (req.custom.user_type_id !== ROLES.OWNER) {
        logger.error(__filename, '', 'validateUserRole', 'You dont have sufficient access', {});
        createResponse(res, STATUS_CODES.FORBIDDEN, 'You dont have sufficient access');
        return;
      }

      next();
    } catch (e) {
      logger.error(__filename, '', 'validateUserRole', 'Error in validation user role', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error in validation user role');
    }
  }
}

export default new RestaurantMiddleware();
