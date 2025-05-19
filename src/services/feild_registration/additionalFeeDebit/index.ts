import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";

namespace additionalFeeDebit {
  export const list = (body: any) =>
    http.post<PaginationResponse<any>>("/additional-fee-debit/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/additional-fee-debit/create", {
      hasAuth: true,
      body,
    });

  export const deleteFeeDebit = (id: number) =>
    http.del<SuccessResponse>(`/additional-fee-debit/delete/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/additional-fee-debit/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default additionalFeeDebit;
