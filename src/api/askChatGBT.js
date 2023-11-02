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
  
 
}
