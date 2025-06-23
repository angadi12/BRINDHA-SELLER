import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetDashboardcount = async () => {
  const token = Cookies.get("token");

  try {

    let result = await fetch(
      `${BaseUrl}/order/vendor/count/dashbaord`,
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


export const Getordergraph = async (filter) => {
  const token = Cookies.get("token");

  try {
   const params= new URLSearchParams();
       if (filter) params.append("filter", filter);

    let result = await fetch(
      `${BaseUrl}/order/vendor/stats/orders?${params.toString()}`,
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

export const Getearninggraph = async (filter) => {
  const token = Cookies.get("token");

  try {
   const params= new URLSearchParams();
       if (filter) params.append("filter", filter);

    let result = await fetch(
      `${BaseUrl}/order/vendor/stats/earnings?${params.toString()}`,
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

