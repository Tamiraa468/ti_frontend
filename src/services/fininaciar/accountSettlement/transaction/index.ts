import http from "service/index";
import { PaginationResponse, SuccessResponse } from "types";

namespace transaction {
  export const list = (body: any) =>
    http.post<PaginationResponse<any>>("/transaction/page", {
      hasAuth: true,
      body,
    });

  export const customerPaymentlist = (body: any) =>
    http.post<PaginationResponse<any>>("/transaction/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/transaction/create", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number) =>
    http.del<SuccessResponse>(`/transaction/delete/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/transaction/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default transaction;
