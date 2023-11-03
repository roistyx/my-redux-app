import axios from "axios";

export default class askChatGBT {
  
static async chatBot(inputValue) {
    console.log("askChatGBT called", inputValue);
    try {
      const response = await axios.post(
        `http://localhost:3100/chatBot`, {inputValue}
      );

      return response
    } catch (error) {
      console.log("Error while getting quotes ", error);
      return false; // or throw the error if you want it to be handled by the caller
    }
    
  }

  static async getChatLog(symbol) {
    console.log("getChatLog called", symbol);
    try {
      const response = await axios.get(
        `http://localhost:3100/retrieve-stock-chat-log/${symbol}`
      );
      return response;
    } catch (error) {
      console.error("Error while calling getStockArticle API:", error);
      throw error; 
    }
   
  }

  static async saveChatLog(chatLog) {
    console.log("saveChatLog called", chatLog);
    try {
      const response = await axios.post(
        "http://localhost:3100/save-user-chat-log",
        {chatLog}
      );
      return response;
    } catch (error) {
      console.error("Error while calling saveStockArticle API:", error);
      throw error; // Propagate the error for better error handling at the caller's side
    }
  }


  
 
}
