import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllorder = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/order/vendor/my/order`, {
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
export const Getorderbyid = async (id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/order/vendor/order/${id}`, {
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

export const Updatestatus = async (id, data) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/order/vendor/order/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const ordercount = async (filter) => {
  const token = Cookies.get("token");

  try {
    if (filter) params.append("filter", filter);

    let result = await fetch(
      `${BaseUrl}/order/vendor/stats?${params.toString()}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      }
    );
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
