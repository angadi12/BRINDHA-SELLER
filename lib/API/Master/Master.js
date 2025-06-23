import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const GetAllTax = async () => {
  const token = Cookies.get("token");

  try {

    let result = await fetch(
      `${BaseUrl}/master/get/Tax`,
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

export const GetAllmeasurement = async () => {
  const token = Cookies.get("token");

  try {

    let result = await fetch(
      `${BaseUrl}/master/get/measurement/vendor`,
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

export const GetAllcateogries = async () => {
  const token = Cookies.get("token");

  try {

    let result = await fetch(
      `${BaseUrl}/master/vendor/get/cateogries`,
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

export const GetAllsubcateogries = async () => {
  const token = Cookies.get("token");

  try {

    let result = await fetch(
      `${BaseUrl}/master/get/subcateogries`,
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

export const Createcategory = async () => {
  const token = Cookies.get("token");

  try {

    let result = await fetch(
      `${BaseUrl}/master/get/subcateogries`,
      {
        method: "POST",
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









