import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import addinitionalFeeSettings from "service/fininaciar/additionalFeeSettings";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        category_ids: detail?.categories?.map((item: any) => item?.id),
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      title="Засах"
      formRef={formRef}
      cancelText={"Буцах"}
      width={1000}
      okText={"Хадгалах"}
      modalProps={{ maskClosable: false, onCancel }}
      onRequest={async (values) => {
        if (
          await addinitionalFeeSettings.update(
            {
              ...values,
            },
            detail?.id || 0
          )
        ) {
          return true;
        }
      }}
      onSuccess={onFinish}
    >
      <Info />
    </IModalForm>
  );
};
