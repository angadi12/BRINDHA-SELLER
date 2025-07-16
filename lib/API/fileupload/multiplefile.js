import { BaseUrl } from "@/lib/API/Baseurl";
import Cookies from "js-cookie";

export const Uploadfiles = async (files) => {
  const token = Cookies.get("token");

  try {
    const formData = new FormData();
    
    // Append all files under key 'Image'
    files.forEach((file) => {
      formData.append("Image", file);
    });

    const response = await fetch(`${BaseUrl}/file/multiple`, {
      method: "POST",
      headers: {
        token: token, // do not set 'Content-Type' for FormData
      },
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const Uploadfile = async (file) => {
  const token = Cookies.get("token");

  try {
    const formData = new FormData();
    formData.append("Image", file); 

    let result = await fetch(
      `${BaseUrl}/file/single`,
      {
        method: "POST",
        headers: {
          token: token, 
        },
        body: formData, 
      }
    );

    result = await result.json();
    return result; 
  } catch (error) {
    return error.message; 
  }
};