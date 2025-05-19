import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";
import { CategoryTypeTypes } from "./type";

namespace categoryType {
  export const list = (body: any) =>
    http.post<PaginationResponse<CategoryTypeTypes>>(
      "/additional-fee-category/page",
      {
        hasAuth: true,
        body,
      }
    );

  export const create = (body: any) =>
    http.post<SuccessResponse>("/additional-fee-category/create", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number) =>
    http.del<SuccessResponse>(`/additional-fee-category/delete/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/additional-fee-category/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default categoryType;
