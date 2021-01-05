import got from 'got';

class Restaurant {
  public async callRestaurant(req: any): Promise<any> {
    try {
      // prepare service url
      const RestaurantUrl: string = process.env.RESTAURANT_APP_NAME + req.originalUrl;

      // User details in Request Header
      req.headers.logged_in_user_id = req.custom.logged_in_user_id;
      req.headers.user_type_id = req.custom.user_type_id;

      const apiResponse = await got(RestaurantUrl, {
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

export default new Restaurant();
