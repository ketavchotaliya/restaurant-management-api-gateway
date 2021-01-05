import got from 'got';

class Reservation {
  public async callReservation(req: any): Promise<any> {
    try {
      // prepare service url
      const ReservationUrl: string = process.env.RESERVATION_APP_NAME + req.originalUrl;

      const apiResponse = await got(ReservationUrl, {
        method: req.method,
        body: req.body,
        headers: req.headers,
        json: true,
      });

      return apiResponse;
    } catch (error) {
      throw error;
    }
  }
}

export default new Reservation();
