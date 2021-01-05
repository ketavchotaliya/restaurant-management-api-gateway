import { CustomRequest, CustomResponse } from '../../environment';
import { Restaurant } from '../../services';
import { logger } from '../../utils/logger';

class ReservationController {
  async callReservation_API(req: CustomRequest, res: CustomResponse) {
    try {
      // call Reservation API
      const apiResponse = await Restaurant.callRestaurant(req);
      res.status(apiResponse.statusCode).json(apiResponse.body);
    } catch (e) {
      logger.error(__filename, '', 'callRestaurant_API', 'Internal Server error', e);
      res.status(e.statusCode).json(e.body);
    }
  }
}

export default new ReservationController();
