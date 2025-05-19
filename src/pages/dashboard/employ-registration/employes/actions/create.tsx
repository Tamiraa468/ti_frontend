import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { Label } from "components/label";
import { IModalForm } from "components/modal";
import { useRef } from "react";
import workers from "service/employ-registration";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";

export const CreateService = ({ ...rest }: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  const createEmployee = useRequest(workers.createWorkers, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <IModalForm
      open={rest.open}
      title={<Label title="Ажилтан нэмэх" />}
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={1000}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={"Буцах"}
      okText={"Хадгалах"}
      className="px-3"
      onRequest={async (values) => {
        if (!!values) {
          if (
            await createEmployee.runAsync({
              ...values,
            })
          ) {
            return true;
          }
        }
      }}
      onSuccess={rest.onFinish}
    >
      <Info action={"create"} />
    </IModalForm>
  );
};
