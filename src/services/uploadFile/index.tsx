import http from "..";

namespace uploadFile {
  export const create = (body: any) =>
    http.post("/upload/files", {
      hasAuth: true,
      body,
    });
}

export default uploadFile;
