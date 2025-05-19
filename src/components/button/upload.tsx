import {
  ProFormUploadButton,
  ProFormUploadButtonProps,
  ProFormUploadDragger,
  ProFormUploadDraggerProps,
} from "@ant-design/pro-form";
import { FieldRequireMessage } from "config";
import EditIcon from "assets/icons/featured-icon.svg";
import { formatKB, formatMB } from "utils/index";
import FilesImage from "assets/icons/files.svg";
import Trash from "assets/icons/trash.svg";
import { CloudDownloadOutlined } from "@ant-design/icons";

type PropsDragger = ProFormUploadDraggerProps & {
  validator?: (value: any) => Promise<any>;
  required?: boolean;
};
export const UploadDraggerButton = ({
  validator,
  required = true,
  ...rest
}: PropsDragger) => {
  return (
    <div id={`${rest.name}`}>
      <ProFormUploadDragger
        {...rest}
        title={
          <div className="w-full h-full bg-[#E7EDEE] space-x-2 text-sm text-gray-600">
            <div className="text-primary">
              <div>
                <img src={EditIcon} />
              </div>
              <span className=" font-semibold  text-[#0077F4] mr-1">
                Файл хавсаргах
              </span>
            </div>
            <div className="">PNG,JPG,PDF(Дээд хэмжээ :800x400px)</div>
          </div>
        }
        // accept=""
        icon={false}
        description={false}
        fieldProps={{
          beforeUpload: (file) => false,
          listType: "picture",
          multiple: true,
          ...{ ...(rest.fieldProps && rest.fieldProps) },
        }}
        rules={
          required
            ? validator
              ? [
                  {
                    required: true,
                    validator: (_, value) => {
                      return validator(value);
                    },
                  },
                ]
              : [
                  {
                    message: FieldRequireMessage,
                    required: true,
                  },
                  // {
                  //   message: "Зөвхөн pdf, png, jpg файл байх ёстой",
                  //   pattern: /.+\.(pdf|png|jpe?g)$/i,
                  // },
                ]
            : undefined
        }
      />
    </div>
  );
};

type PropsUpload = ProFormUploadButtonProps & {};

export const UploadButton = ({
  title = "Файл хавсаргах",
  required = true,
  label = "Файл",
  ...rest
}: PropsUpload) => {
  return (
    <div id={`${rest.name}`} className="custom-btn-remove-bg">
      <ProFormUploadButton
        {...rest}
        title={title}
        label={label}
        extra="PNG,JPG,PDF(Дээд хэмжээ :800x400px)"
        width={400}
        accept=".jpg,.jpeg,.png,.pdf"
        fieldProps={{
          beforeUpload: (_) => false,
          multiple: true,
          itemRender: (originNode, file, fileList, actions) => {
            return (
              <div className="flex justify-between items-center bg-[#E7EDEE] rounded-xl p-4 my-2">
                <div className="flex gap-3 items-center justify-center">
                  <img src={FilesImage} alt="file image" />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium m-0 p-0">{file.name}</p>
                    <p className="text-[#475467] font-normal text-sm p-0 m-0">
                      {formatKB(file.size!, 1)}
                    </p>
                  </div>
                </div>
                <img src={Trash} alt="trash" onClick={() => actions.remove()} />
              </div>
            );
          },
        }}
        className="w-full"
        icon={<CloudDownloadOutlined rev={undefined} />}
        rules={
          required
            ? [
                {
                  message: FieldRequireMessage,
                  required: true,
                },
                // {
                //   pattern: /.+\.(pdf|png|jpe?g)$/i,
                //   message: "Зөвхөн pdf, png, jpg файл байх ёстой",
                // },
              ]
            : undefined
        }
      />
    </div>
  );
};
