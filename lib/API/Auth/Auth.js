import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const Createvendor = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/vendor/create/vendor`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Vendorlogin = async (data) => {
  try {
    let result = await fetch(`${BaseUrl}/vendor/login/vendor`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Sendverification = async (data) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/sendverification/vendor`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Getverficationdata = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/myverification`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      token: token,
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const Getverificationstatus = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/myverification/status`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
