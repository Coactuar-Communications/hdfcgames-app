import axios, { AxiosRequestConfig, Method } from "axios";
import store from "../store";
import { showLoader, hideLoader } from "../store/toastSlice";

const BASE_URL = "https://gameserver.coact.live/apis";

interface ResponseData {
  isSuccess?: boolean;
  msg?: string;
  [key: string]: any;
}

async function getData(
  url: string,
  otherData: AxiosRequestConfig = {}
): Promise<ResponseData> {
  try {
    store.dispatch(showLoader());
    const { data } = await axios.get(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      ...otherData,
    });
    store.dispatch(hideLoader());
    return data;
  } catch (error: any) {
    store.dispatch(hideLoader());
    const responseData = error.response?.data || {};
    return {
      isSuccess: false,
      msg: responseData.msg || error.message || "An error occurred",
    };
  }
}

async function postData(
  url: string,
  payload: Record<string, any>,
  method: Method = "POST"
): Promise<ResponseData> {
  try {
    store.dispatch(showLoader());
    const { data } = await axios({
      method, // Shorthand syntax
      url: `${BASE_URL}/${url}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    store.dispatch(hideLoader());
    return data;
  } catch (error: any) {
    store.dispatch(hideLoader());
    const responseData = error.response?.data || {};
    return {
      isSuccess: false,
      msg: responseData.msg || error.message || "An error occurred",
    };
  }
}

export { getData, postData };
