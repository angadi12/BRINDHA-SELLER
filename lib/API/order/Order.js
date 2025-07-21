import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllorder = async (filter,page, limit) => {
  const token = Cookies.get("token");

  try {
    const params=new URLSearchParams()
    if (filter) params.append("filter", filter);
      if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
      
    let result = await fetch(`${BaseUrl}/order/vendor/my/order?${params.toString()}`, {
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
    const params=new URLSearchParams()
    
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
