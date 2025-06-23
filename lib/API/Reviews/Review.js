import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllreview = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/rating/fetch/vendor/Rating`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
