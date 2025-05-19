import { AntdFile } from "types";
import {
  FileRecord,
  MultiFileUpload,
  MultiFileUploads,
  SingleFileUpload,
} from "./types";
import http from "..";

namespace file {
  export const upload = async ({
    file,
    onUploadProgress,
  }: SingleFileUpload) => {
    const body = new FormData();

    body.append("files", file);

    return http.post<FileRecord[]>("/upload/files", {
      body,
      hasAuth: true,
      onUploadProgress: onUploadProgress,
    });
  };

  export const uploadTest = async ({ files }: MultiFileUpload) => {
    const body = new FormData();

    if (files.length === 0) {
      return [];
    }
    files.forEach((file, ind) => {
      body.append("files", file?.originFileObj);
    });

    return http.post<FileRecord[]>("upload/files", {
      body,
      hasAuth: true,
    });
  };

  export const uploads = async ({ files }: MultiFileUpload) => {
    const body = new FormData();

    if (files.length === 0) {
      return [];
    }
    files.forEach((file, ind) => {
      file?.map((item: any) => {
        body.append("files", item.originFileObj);
      });
    });

    return http.post<FileRecord[]>("upload/files", {
      body,
      hasAuth: true,
    });
  };

  export const uploadsMulti = async ({
    files,
    names,
    onUploadProgress,
  }: MultiFileUploads) => {
    const body = new FormData();

    if (files.length === 0) {
      return [];
    }
    files.forEach((file, ind) => {
      body.append("names", names[ind]);
      body.append("files", file.originFileObj);
    });

    return await http.post<FileRecord[]>("/upload/files", {
      body,
      hasAuth: true,
      onUploadProgress: onUploadProgress,
    });
  };

  export const fileToUrl = (val: string) => {
    return `${import.meta.env.VITE_FILE_GET_URL}${val}`;
  };

  export const getFileName = (val: string) => {
    return val.split("/").pop()?.substring(15);
  };

  export const getUploadableFiles = (val?: AntdFile[]) => {
    return val?.filter((item) => !!item.originFileObj) || [];
  };

  export const getPaths = (
    searchVal: string,
    uploadedItems: string[],
    existingItems?: AntdFile[]
  ) => {
    for (let val of existingItems || []) {
      if (val.uid.includes(searchVal)) {
        uploadedItems.push(val.uid);
      }
    }
    return uploadedItems;
  };
}

export default file;
