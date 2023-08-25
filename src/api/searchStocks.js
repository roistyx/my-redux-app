import axios from "axios";
export default class searchStocks {
  static async getStockQuote(symbol) {
    try {
      const response = await axios.get(`http://localhost:3100/quote/${symbol}`);

      return response;
    } catch (error) {
      console.log("Error while calling getUserProfile API ", error);
    }
  }

  static async getStockData(searchObj) {
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

  static async summarizeNews(article) {
    try {
      const response = await axios.post(
        "http://localhost:3100/summarize",
        article
      );
      return response.data;
    } catch (error) {
      console.error("Error while calling summarizeNews API:", error);
      throw error; // Propagate the error for better error handling at the caller's side
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
