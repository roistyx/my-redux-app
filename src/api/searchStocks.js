import axios from "axios";
export default class searchStocks {
  constructor() {
    this.retries = 5;
  }

  static async getStockQuote(symbol) {
    try {
      const response = await axios.get(`http://localhost:3100/quote/${symbol}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error while getting quotes ", error);
    }
  }

  static async getStockData(searchObj, interval) {
    console.log("Interval", interval);
    try {
      const response = await axios.post(
        "http://localhost:3100/historical",
        searchObj,
        {
          params: {
            interval: interval,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("Error while getting historical data API ", error);
      return false;
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
      return response;
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

  static async saveStockArticle(article) {
    console.log("saveStockArticle called", article);
    try {
      const response = await axios.post(
        "http://localhost:3100/save-article",
        article
      );
      return response;
    } catch (error) {
      console.error("Error while calling saveStockArticle API:", error);
      throw error; // Propagate the error for better error handling at the caller's side
    }
  }
}
