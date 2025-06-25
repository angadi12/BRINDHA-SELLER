import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllTickets = async () => {
  const token = Cookies.get("token");

  try {
  

    let result = await fetch(
      `${BaseUrl}/tickets/getmy/ticket`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      }
    );
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Sendmessage = async (ticketId,data) => {
  const token = Cookies.get("token");

  try {
   

    let result = await fetch(
      `${BaseUrl}/tickets/chat/ticket/${ticketId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
        body:JSON.stringify(data)
      }
    );
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};



