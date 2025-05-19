import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";

namespace assignation {
  export const list = (body: any) =>
    http.post<PaginationResponse<any>>("/assignation/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<SuccessResponse>("/assignation/create", {
      hasAuth: true,
      body,
    });

  export const deleteRegistration = (body: any, id: number) =>
    http.del<SuccessResponse>(`/transport-create/delete/${id}`, {
      hasAuth: true,
      body,
    });

  export const updateRegistration = (body: any, id: number) =>
    http.put<SuccessResponse>(`/assignation/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const getAssignation = (body: any, id: number) =>
    http.put<SuccessResponse>(`/assignation/get/${id}`, {
      hasAuth: true,
      body,
    });
}

export default assignation;
