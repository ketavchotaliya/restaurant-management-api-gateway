import got from 'got';

class Reservation {
  public async callReservation(req: any): Promise<any> {
    try {
      // prepare service url
      const ReservationUrl: string = process.env.RESERVATION_APP_NAME + req.originalUrl;

      // request header
      const reqHeader = {
        logged_in_user_id: req.custom.logged_in_user_id,
        user_type_id: req.custom.user_type_id,
        Authorization: req.headers.authorization,
      };

      const apiResponse: any = await got(ReservationUrl, {
        method: req.method,
        json: true,
        body: req.body,
        headers: reqHeader,
      });

      return apiResponse;
    } catch (error) {
      throw error;
    }
  }
}

export default new Reservation();
