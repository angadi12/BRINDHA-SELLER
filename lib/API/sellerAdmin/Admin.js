import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllAdmin = async () => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/support/staff/vendors`, {
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
export const GetAdminbyid = async (id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/support/staff/vendor/${id}`, {
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
export const DeleteAdmin = async (id) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/support/staff/vendor/${id}`, {
      method: "DELETE",
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

export const CreateAdmin = async (data) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/support/staff/vendor`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body:JSON.stringify(data)
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
export const UpdateAdmin = async (id,data) => {
  const token = Cookies.get("token");

  try {
    let result = await fetch(`${BaseUrl}/vendor/support/staff/vendor/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
      body:JSON.stringify(data)
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};
