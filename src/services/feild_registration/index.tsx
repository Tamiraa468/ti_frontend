import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import {
  CargoApproachList,
  GetPublicView,
  GetTempAdditionalFeeType,
  TicketAdditionalFeeType,
} from "./type";

namespace fieldRegistration {
  export const list = (body: any) =>
    http.post<PaginationResponse<CargoApproachList>>("/transport-record/page", {
      hasAuth: true,
      body,
    });

  export const create = (body: any) =>
    http.post<CargoApproachList>("/transport-record/create", {
      hasAuth: true,
      body,
    });

  export const ticketAdditionalFee = (body: any) =>
    http.post<TicketAdditionalFeeType>(
      "/transport-record/create/additional-fee-ticket",
      {
        hasAuth: true,
        body,
      }
    );

  export const getTempAdditionalFee = (body: any, id: number) =>
    http.post<GetTempAdditionalFeeType>(
      `/transport-record/additional-fee-ticket/${id}`,
      {
        hasAuth: true,
        body,
      }
    );

  export const deleteRegistration = (id: number) =>
    http.del<SuccessResponse>(`/transport-record/delete/${id}`, {
      hasAuth: true,
    });

  export const updateRegistration = (body: any, id: number) =>
    http.put<SuccessResponse>(`/transport-record/update/${id}`, {
      hasAuth: true,
      body,
    });

  export const getPublicDetailData = (id: number) =>
    http.get<GetPublicView>(`/transport-record/${id}`, {
      hasAuth: true,
    });
}

export default fieldRegistration;
