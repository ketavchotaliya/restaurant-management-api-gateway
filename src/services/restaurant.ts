import got from 'got';

class Restaurant {
  public async callRestaurant(req: any): Promise<any> {
    try {
      // prepare service url
      const RestaurantUrl: string = process.env.RESTAURANT_APP_NAME + req.originalUrl;

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
