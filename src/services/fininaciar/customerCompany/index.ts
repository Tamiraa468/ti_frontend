import { PaginationResponse, SuccessResponse } from "types";
import http from "../..";
import { CustomerCompanyType } from "./type";

namespace customerCompany {
  export const list = async() => {
    const response = await fetch("http://localhost:8000/api/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch customer company list: ${response.status} ${response.statusText}`);
    }

    const dataResponse = await response.json();
    console.log("yes", dataResponse);

    if (!dataResponse || !Array.isArray(dataResponse.items)) {
      throw new Error("items must be an array");
    }

    return dataResponse;
  }

  export const create = (body: any) =>
    http.post<SuccessResponse>("/customer-company/create", {
      hasAuth: true,
      body,
    });

  export const deleteA = (id: number) =>
    http.del<SuccessResponse>(`/customer-company/delete/${id}`, {
      hasAuth: true,
    });

  export const update = (body: any, id: number) =>
    http.put<SuccessResponse>(`/customer-company/update/${id}`, {
      hasAuth: true,
      body,
    });
}

export default customerCompany;
