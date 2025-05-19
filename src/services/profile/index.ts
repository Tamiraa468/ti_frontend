import http from "service/index";
import { SuccessResponse } from "types";

namespace profile {
  export const info = (body: any) =>
    http.put<SuccessResponse>("/profile", {
      hasAuth: true,
      body,
    });

  export const editPassword = async (
    id: string,
    body: { password: string }
  ) => {
    const response = await fetch(
      `http://localhost:8000/api/employee/changePassword/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update password: ${response.status} ${response.statusText}`
      );
    }

    const dataResponse = await response.json();

    if (!dataResponse || !dataResponse.success) {
      throw new Error(
        `Failed to update password: ${dataResponse.message || "Unknown error"}`
      );
    }

    return dataResponse.data;
  };
}

export default profile;