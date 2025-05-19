import http from "..";
import { ResponseType } from "./type";

namespace address {
  export const city = () =>
    http.get<ResponseType[]>("/public/address/city", {
      hasAuth: true,
    });
  export const district = (id: any) =>
    http.get<ResponseType[]>(`/public/address/district/${id}`, {
      hasAuth: true,
    });
  export const khoroo = (id: any) =>
    http.get<ResponseType[]>(`/public/address/khoroo/${id}`, {
      hasAuth: true,
    });
}

export default address;
