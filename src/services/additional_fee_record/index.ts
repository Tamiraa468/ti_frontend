import { PaginationResponse, SuccessResponse } from "types";
import http from "..";

namespace additionalFeeCategory {
  export const list = (body: any) =>
    http.post<PaginationResponse<any>>("/additional-fee-category/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/additional-fee-category/create", {
      hasAuth: true,
      body,
    });

  export const deleteCategory = (body: any) =>
    http.del<SuccessResponse>("/additional-fee-category/delete", {
      hasAuth: true,
      body,
    });

  export const updateCategory = (body: any, id: number) =>
    http.put<SuccessResponse>(`/additional-fee-category/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default additionalFeeCategory;
