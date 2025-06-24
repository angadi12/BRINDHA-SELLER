import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const Addproducts = async (data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/product/add/products`, {
      method: "POST",
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
export const Updateproducts = async (id,data) => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/product/update/products/${id}`, {
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



export const Sendproductforverification = async (data) => {
  const token=Cookies.get("token")
  try {
    let result = await fetch(`${BaseUrl}/product/sendforverification`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        token:token
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};





export const liveproduct = async (data) => {
  const token=Cookies.get("token")
  try {
    let result = await fetch(`${BaseUrl}/product/liveproduct`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        token:token
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const getproductbyid = async (id) => {
  const token=Cookies.get("token")
  try {
    let result = await fetch(`${BaseUrl}/product/get/myproduct/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token:token
      },
    });
    result = await result.json();
    return result;
  } catch (error) {
    return error.message;
  }
};

export const getproductcount = async () => {
  const token = Cookies.get("token");
  try {
    let result = await fetch(`${BaseUrl}/product/count/products`, {
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

export const Getallproduct = async (
  Status,
  CategoryId,
  SubcategoryId,
  Measturments,
  page,
  limit
) => {
  const token = Cookies.get("token");
  try {
    const params = new URLSearchParams();
    if (Status) params.append("Status", Status);
    if (CategoryId) params.append("CategoryId", CategoryId);
    if (SubcategoryId) params.append("SubcategoryId", SubcategoryId);
    if (Measturments) params.append("Measturments", Measturments);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);

    let result = await fetch(
      `${BaseUrl}/product/get/myproduct?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          token: token,
        },
      }
    );
    result = await result.json();
    return result;
  } catch (error) {
    console.log(error)
    return error.message;
  }
};
