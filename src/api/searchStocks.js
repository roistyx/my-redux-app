import axios from "axios";
export default class searchStocks {
  static async getStockQuote(symbol) {
    console.log("Get quote called", symbol);

    try {
      const response = await axios.get(`http://localhost:3100/quote/${symbol}`);
      console.log("response", response);

      return response;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }

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
      console.log("response", response);

      return response;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }

  static async summarizeNews(selectedNews) {
    console.log("summarizeNews called", selectedNews);

    try {
      const response = await axios.post(
        "http://localhost:3100/summarize",
        selectedNews
      );

      return response;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }

  static async extractNews(url) {
    try {
      const response = await fetch("http://localhost:3100/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();

      return data.articleContent;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
}
