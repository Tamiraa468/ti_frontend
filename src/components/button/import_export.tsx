import { Button, ButtonProps, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CloudDownloadOutlined } from "@ant-design/icons";

type Props = ButtonProps & {
  importFile: (file: RcFile) => void;
  loading?: boolean;
};
export const ImportButton = ({ importFile, loading, ...rest }: Props) => {
  return (
    <Upload
      key="button"
      accept=".xlsx"
      disabled={loading ?? false}
      style={{ background: "gold", borderColor: "gold" }}
      maxCount={1}
      fileList={[]}
      beforeUpload={async (v) => {
        importFile(v);
      }}
    >
      <Button
        {...rest}
        className="flex items-center text-md font-semibold"
        loading={loading}
        icon={<AiOutlineCloudUpload size={20} />}
      >
        <span className="ml-2"> Import</span>
      </Button>
    </Upload>
  );
};

type PropsExport = ButtonProps & {
  loading?: boolean;
};
export const ExportButton = ({ loading, ...rest }: PropsExport) => {
  return (
    <Button
      {...rest}
      className="flex items-center text-md font-semibold"
      loading={loading}
      size="large"
      icon={
        <CloudDownloadOutlined
          style={{
            fontSize: 20,
          }}
          rev={undefined}
        />
      }
    >
      <span className="ml-2">{rest.title ?? "Татах"}</span>
    </Button>
  );
};
