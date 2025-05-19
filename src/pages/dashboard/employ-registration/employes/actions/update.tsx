import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import workers from "service/employ-registration";
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
        first_name: detail?.first_name ?? undefined,
        last_name: detail?.last_name,
        registration_number: detail?.registration_number,
        gender: detail?.gender ?? undefined,
        email: detail?.email ?? undefined,
        phone: detail?.phone,
        role_name: detail?.role_name,
        role_id: detail?.role_id,
        password: detail?.password,
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
          await workers.updateWorkers(
            {
              ...values,
            },
            detail?._id || 0
          )
        ) {
          return true;
        }
      }}
      onSuccess={onFinish}
    >
      <Info action="update" />
    </IModalForm>
  );
};
