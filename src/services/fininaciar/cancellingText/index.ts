import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";
import { InvalidateTicketList } from "./type";

namespace invalidatingAdditionalFee {
  export const list = (body: any) =>
    http.post<PaginationResponse<InvalidateTicketList>>(
      "/additional-fee-ticket-invalidate-request/page",
      {
        hasAuth: true,
        body,
      }
    );

  export const create = (body: any) =>
    http.post<SuccessResponse>(
      "/additional-fee-ticket-invalidate-request/create",
      {
        hasAuth: true,
        body,
      }
    );

  export const invalidate = (id: number) =>
    http.post<SuccessResponse>(
      `/additional-fee-ticket-invalidate-request/review/${id}`,
      {
        hasAuth: true,
      }
    );

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/additional-fee/${id}`, {
      hasAuth: true,
      body,
    });
}

export default invalidatingAdditionalFee;
