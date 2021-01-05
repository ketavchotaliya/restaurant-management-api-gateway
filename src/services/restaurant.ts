import got from 'got';

class Restaurant {
  public async callRestaurant(req: any): Promise<any> {
    try {
      // prepare service url
      const RestaurantUrl: string = process.env.RESTAURANT_APP_NAME + req.originalUrl;

      // request header
      const reqHeader = {
        logged_in_user_id: req.custom.logged_in_user_id,
        user_type_id: req.custom.user_type_id,
        Authorization: req.headers.authorization,
      };

      const apiResponse: any = await got(RestaurantUrl, {
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

export default new Restaurant();
