import { PaginationResponse } from "types";
import http from "..";

namespace report {
  export const list = (body: any) =>
    http.post<PaginationResponse<any>>("/report/page", {
      hasAuth: true,
      body,
    });
}

export default report;
