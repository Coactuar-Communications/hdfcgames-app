import axios, { AxiosRequestConfig, Method } from "axios";
import store from "../store";
import { showLoader, hideLoader } from "../store/toastSlice";

interface ResponseData {
  isSuccess?: boolean;
  msg?: string;
  [key: string]: any; // For additional response fields
}

async function getData(url: string, otherData: AxiosRequestConfig = {}): Promise<ResponseData> {
  try {
    store.dispatch(showLoader());
    const { data } = await axios.get(`http://localhost:9000/apis/${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      ...otherData,
    });
    store.dispatch(hideLoader());
    return data;
  } catch (error: any) {
    store.dispatch(hideLoader());
    return { isSuccess: false, msg: error.message || error };
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
        url: `http://localhost:9000/apis/${url}`,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("USERTOKEN")}`,

        },
      });

      store.dispatch(hideLoader());
      return data;
    } catch (error: any) {
      store.dispatch(hideLoader());
      return { isSuccess: false, msg: error.message || error };
    }
  }

export { getData, postData };
