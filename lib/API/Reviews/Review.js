import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllreview = async (filter,page, limit) => {
  const token = Cookies.get("token");

  try {
 const params=new URLSearchParams()
    if (filter) params.append("filter", filter);
      if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
      

    let result = await fetch(`${BaseUrl}/rating/fetch/vendor/Rating?${params.toString()}`, {
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
