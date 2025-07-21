import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllcount = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/payout/fetch/vendor/payout/count`, {
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

export const GetAllpayout = async (filter, page, limit) => {
  const token = Cookies.get("token");

  try {
    const params = new URLSearchParams();

    if (filter) params.append("filter", filter);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    let result = await fetch(
      `${BaseUrl}/payout/fetch/vendor/payout?${params.toString()}`,
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

export const GetAllpayment = async (filter, page, limit) => {
  const token = Cookies.get("token");

  try {
    const params = new URLSearchParams();

    if (filter) params.append("filter", filter);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    let result = await fetch(
      `${BaseUrl}/payout/fetch/user/order/payment?${params.toString()}`,
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
