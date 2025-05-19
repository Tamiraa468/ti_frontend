import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { DirectionType, FORM_ITEM_RULE } from "config";
import moment from "moment";
import { useEffect } from "react";
import fieldRegistration from "service/feild_registration";
import foreign from "service/fininaciar/foreign";
import { ActionComponentProps } from "types";
import {
  CapacityOptions,
  CurrencyOptions,
  ManagerPaymentMethod,
} from "utils/options";

export const CreateCargoApproach: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
}) => {
  const addCargo = useRequest(fieldRegistration.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хадгалагдлаа",
      });
      onFinish?.();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onCancel?.();
    },
  });

  const listForeign = useRequest(foreign.list, {
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    listForeign.run({
      is_all: true,
    });
  }, [open]);

  return (
    <ModalForm
      onFinish={async (values) => {
        await addCargo.runAsync({
          ...values,
          approach_report_date: moment(values.approach_report_date).toDate(),
        });
      }}
      initialValues={{
        direction: DirectionType.south,
      }}
      title="Ачаа чингэлэг тээврийн бүртгэл "
      open={open}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel,
        styles: {
          header: {
            padding: "1.2rem",
            borderBottom: "1px solid #EAECF0",
          },
          content: {
            padding: "0",
          },
          body: {
            padding: "1.2rem 1.2rem 0 1.2rem",
          },
          footer: {
            padding: "0 1.2rem 1.2rem 1.2rem",
          },
        },
      }}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
                Болих
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                loading={addCargo.loading}
              >
                Хадгалах
              </Button>
            </div>
          );
        },
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"container_code"}
                    placeholder="Чингэлэг дугаар"
                    label={"Чингэлэг дугаар"}
                    rules={[
                      ...FORM_ITEM_RULE(),
                      {
                        pattern: /^[A-Z]{4}[\d\W]{8}$/i,
                        message: "Чингэлэг дугаар буруу байна!",
                      },
                    ]}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    name={"capacity"}
                    options={CapacityOptions?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    placeholder="Даац"
                    label={"Даац"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[{ label: "TI Logistic", value: 1 }].map(
                      (item) => ({
                        label: item.label,
                        value: item.value,
                      })
                    )}
                    initialValue={1}
                    name="broker_id"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"transport_direction"}
                    placeholder="Тээврийн чиглэл"
                    label="Тээврийн чиглэл"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormRadio.Group
                    fieldProps={{
                      size: "large",
                    }}
                    name={"direction"}
                    label="Чиглэл"
                    options={[
                      {
                        label: "Урд",
                        value: DirectionType.south,
                      },
                      {
                        label: "Хойд",
                        value: DirectionType.north,
                      },
                    ]}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormDatePicker
                    name="approach_report_date"
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder="Дөхөлтийн мэдээний огноо"
                    rules={FORM_ITEM_RULE()}
                    label="Дөхөлтийн мэдээний огноо"
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Ачаа</div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["container_cargo", "cargo_name"]}
                    placeholder="Ачааны нэр төрөл"
                    label="Ачааны нэр төрөл"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["container_cargo", "reciever_email"]}
                    placeholder="Хүлээн авагч"
                    label="Хүлээн авагч"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["container_cargo", "reciever_phone"]}
                    placeholder="Утас"
                    label="Утас"
                    rules={[
                      {
                        required: true,
                        message: "Утас оруулах шаардлагатай!",
                      },
                      {
                        pattern: /^[0-9]{8}$/,
                        message: "Утас буруу байна!",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Авах</div>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormDigit
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_recieve", "transport_fee"]}
                    placeholder="Тээврийн хөлс"
                    label={"Тээврийн хөлс"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={CurrencyOptions?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    name={["transport_recieve", "currency"]}
                    placeholder="Валют"
                    label={"Валют"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_recieve", "customer_company_name"]}
                    placeholder="Харилцагч"
                    label="Харилцагч"
                    // rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormSelect
                    options={ManagerPaymentMethod.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_recieve", "payment_method"]}
                    placeholder="Төлөх арга"
                    label="Төлөх арга"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_recieve", "additional_fee_note"]}
                    placeholder="Э/Хураамж санамж"
                    label="Э/Хураамж санамж"
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Өгөх</div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDigit
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_give", "transfer_fee"]}
                    placeholder="Шилжүүлэх тээврийн хөлс"
                    label="Шилжүүлэх тээврийн хөлс"
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_give", "foreign_customer_company_id"]}
                    options={listForeign?.data?.items?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    placeholder="Гадаад тээвэр зууч"
                    label="Гадаад тээвэр зууч"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["transport_give", "transfer_broker_name"]}
                    placeholder="Төлбөр хариуцагчийн нэр"
                    label="Төлбөр хариуцагчийн нэр"
                  />
                </Col>
              </Row>
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
