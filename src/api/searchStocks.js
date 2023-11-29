import axios from 'axios';
export default class searchStocks {
  constructor() {
    this.retries = 5;
  }

  static async getStockQuote(symbol) {
    // console.log('getStockQuote called', symbol);
    function formatDate(year, month, day) {
      return `${year.toString().padStart(4, '0')}-${month
        .toString()
        .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    const date = formatDate(new Date().getFullYear(), 1, 1);

    try {
      // Fetch daily open-close data
      const response = await axios.get(
        `http://localhost:3100/stock-data/${symbol}/${date}`
      );

      // console.log('Response', response.data);

      return response.data;
    } catch (error) {
      console.log('Error while getting quotes ', error);
      return false; // or throw the error if you want it to be handled by the caller
    }
  }

  static async getStockData(searchObj, multiplier, interval) {
    searchObj.interval = interval;
    searchObj.multiplier = multiplier;
    try {
      const response = await axios.post(
        'http://localhost:3100/historical',
        searchObj
      );

      return response.data;
    } catch (error) {
      console.log('Error while getting historical data API ', error);
      return false;
    }
  }

  static async getStockNews(symbol) {
    console.log('getStockNews called', symbol);

    try {
      const response = await axios.get(
        `http://localhost:3100/stock-news/${symbol}`
      );

      return response;
    } catch (error) {
      console.log('Error while calling getUserProfile API ', error);
    }
  }

  static async summarizeNews(article) {
    try {
      const response = await axios.post(
        'http://localhost:3100/summarize',
        article
      );
      return response;
    } catch (error) {
      console.error('Error while calling summarizeNews API:', error);
      throw error; // Propagate the error for better error handling at the caller's side
    }
  }

  static async extractNews(url) {
    try {
      const response = await fetch('http://localhost:3100/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      const data = await response.json();

      return data.articleContent;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  static async saveStockArticle(article) {
    console.log('saveStockArticle called', article);
    try {
      const response = await axios.post(
        'http://localhost:3100/save-article',
        article
      );
      return response;
    } catch (error) {
      console.error('Error while calling saveStockArticle API:', error);
      throw error; // Propagate the error for better error handling at the caller's side
    }
  }

  static async getStockFinancials(symbol, reportType, dates, selectedQuarter) {
    const { startDate, endDate } = dates;

    if (reportType != 'bs' && reportType != 'cf') {
      reportType = `ic`;
    }

    try {
      const response = await axios.get(
        `http://localhost:3100/stock-financials/${reportType}/${symbol}/${startDate}/${endDate}/${selectedQuarter}`
      );

      console.log('response.data.userRequestedReport', response.data);
      return response.data;
    } catch (error) {
      console.error('Error while calling getStockFinancials API:', error);
      return false;
    }
  }

  static async saveFinancialReport(report, report_type) {
    console.log('getFinancialReport called', report, report_type);
    try {
      const response = await axios.post('http://localhost:3100/save-report', {
        report,
        report_type
      });
      console.log('save', response);
      return response;
    } catch (error) {
      console.error('Error while calling getFinancialReport API:', error);
      return false;
    }
  }

  static async getFinancialReportList(symbol, report_type) {
    // console.log('getFinancialReportList called', report_type, symbol);
    try {
      const response = await axios.get(
        `http://localhost:3100/financial-report-list/${report_type}/${symbol}`
      );
      // console.log('getFinancialReportList called', response);
      return response.data;
    } catch (error) {
      console.error('Error while calling getFinancialReportList API:', error);
      return false;
    }
  }
}
