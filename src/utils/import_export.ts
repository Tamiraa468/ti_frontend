import { notification } from "antd";
import { RcFile } from "antd/lib/upload";
import readXlsxFile from "read-excel-file";

export async function excelToJson<T>(file: RcFile, schema: any) {
  const { rows, errors } = await readXlsxFile(file, { schema });
  try {
    if (errors.length > 0) {
      throw Error(
        `${[
          ...new Set(errors.map((el) => el.row)),
        ]} - мөрүүд дээр алдаа гарлаа. Датагаа дахин шалгана уу!`
      );
    } else {
      return rows as T[];
    }
  } catch (err: any) {
    notification.error({
      message: `${err?.message}`,
      duration: 0,
    });
  }
}
