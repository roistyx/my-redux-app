import axios from "axios";
export default class searchStocks {
  static async getStockData(searchObj) {
    console.log("getStockData called", searchObj);

    try {
      const response = await axios.post(
        "http://localhost:3100/historical",
        searchObj
      );

      return response.data;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }

  static async getStockNews(symbol) {
    console.log("getStockNews called", symbol);

    try {
      const response = await axios.get(
        `http://localhost:3100/stock-news/${symbol}`
      );

      return response;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }
}
