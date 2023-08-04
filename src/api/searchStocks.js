import axios from "axios";
export default class searchStocks {
  static async getStockData(searchObj) {
    console.log("getStockData called", searchObj);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:3100/historical",
    //     searchObj
    //   );
    //   console.log(response.data);
    //   return response.data;
    // } catch (error) {
    //   console.log("Error while calling getStockData API ", error);
    // }

    try {
      const response = await axios.post(
        "http://localhost:3100/historical",
        "searchObj"
      );
      return response.data;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }
}
