import axios, { AxiosRequestConfig, CancelToken } from "axios";
import auth from "service/auth";
import { BaseResponse } from "types";

const baseURL = import.meta.env.VITE_API_URL;
const webSocketURL = import.meta.env.VITE_WS_URL;

export interface IParams {
  [key: string]: string;
}

export interface IHeader {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IOption {
  body?: IBody;
  hasAuth?: boolean;
  headers?: IHeader;
  params?: IParams;
  cancelToken?: CancelToken;
  onUploadProgress?: (progressEvent: any) => void;
}

namespace http {
  export const getAuth = (hasAuth = false) =>
    hasAuth && auth.getToken()
      ? {
          Authorization: `Bearer ${auth.getToken()}`,
        }
      : {};

  export const genHeader = (hasAuth = false, headers = {}) =>
    Object.assign(headers, getAuth(hasAuth), {
      Locale: localStorage.getItem("web.locale") || "mn",
    });

  export const handleError = (err: any, reject: any) => {
    if (err && err.response && err.response.data) {
      return reject(err.response.data);
    }

    return reject({ message: "Unhandled error" });
  };

  export const requestRaw = async <T>(options: AxiosRequestConfig) => {
    return new Promise<T>((resolve, reject) => {
      axios
        .request<T>({
          baseURL,
          ...options,
          withCredentials: true,
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => handleError(err, reject));
    });
  };

  export const request = async <T>(options: AxiosRequestConfig) => {
    return new Promise<BaseResponse<T>>((resolve, reject) => {
      axios
        .request<BaseResponse<T>>({
          baseURL,
          ...options,
          withCredentials: true,
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => handleError(err, reject));
    });
  };

  export const getRaw = async <T>(
    url: string,
    options?: IOption
  ): Promise<T> => {
    return await requestRaw<T>({
      method: "GET",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      params: options?.params,
      cancelToken: options?.cancelToken,
      responseType: "arraybuffer",
    }).then((data) => data);
  };

  export const get = async <T>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "GET",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      params: options?.params,
      cancelToken: options?.cancelToken,
    }).then((data) => data.body);
  };

  export const post = async <T>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "POST",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      data: options?.body,
      onUploadProgress: options?.onUploadProgress,
      cancelToken: options?.cancelToken,
    }).then((data) => data.body);
  };

  export const put = async <T>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "PUT",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      data: options?.body,
      cancelToken: options?.cancelToken,
    }).then((data) => data.body);
  };

  export const del = async <T>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "DELETE",
      url,
      headers: genHeader(options?.hasAuth, options?.headers),
      data: options?.body,
      cancelToken: options?.cancelToken,
    }).then((data) => data.body);
  };

  export const cancelToken = axios.CancelToken.source();
}

export namespace websocket {
  export const connect = (url: string): WebSocket => {
    return new WebSocket(webSocketURL + url);
  };
}

export default http;
