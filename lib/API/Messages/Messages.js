import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllTickets = async (role) => {
  const token = Cookies.get("token");

  try {
    const params = new URLSearchParams();
    if (role) params.append("role", role);

    let result = await fetch(
      `${BaseUrl}/tickets/getall/ticket?${params.toString()}`,
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
