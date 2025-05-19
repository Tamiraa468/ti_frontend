import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import IBadge from "components/badge";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import fieldRegistration from "service/feild_registration";
import { ActionComponentProps } from "types";

export const UpdateCargoApproach: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  detail,
}) => {
  const updateCargo = useRequest(fieldRegistration.updateRegistration, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай засагдлаа",
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

  return (
    <ModalForm
      onFinish={async (values) => {
        await updateCargo.runAsync(
          {
            ...values,
            arrived_at_site: dayjs(values.arrived_at_site).toDate(),
          },
          detail?.id
        );
      }}
      title="Талбайн бүртгэл"
      open={!!detail}
      initialValues={{
        ...detail,
        date: detail?.date ? dayjs(detail.date) : undefined,
      }}
      modalProps={{
        destroyOnClose: true,
        width: "700px",
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
                loading={updateCargo.loading}
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
                <Col span={4}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"category"}
                    placeholder="Төрөл"
                    label={"Төрөл"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={10}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[]}
                    name={"container_code"}
                    placeholder="Чингэлэг дугаар"
                    label={"Чингэлэг дугаар"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={10}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[]}
                    name="name"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"arrived_at_site"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"date_2"}
                      placeholder="Задарсан"
                      label="Задарсан"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"date_3"}
                      placeholder="Суларсан"
                      label="Суларсан"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"date_4"}
                      placeholder="Т-c явсан"
                      label="Т-c явсан"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"comeback_date"}
                      placeholder="Буцаж ирсэн"
                      label="Буцаж ирсэн"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"date_6"}
                      placeholder="Ачилт хийсэн"
                      label="Ачилт хийсэн"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Олголт</div>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"waggon_number"}
                    placeholder="Вагоны дугаар"
                    label="Вагоны дугаар"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"cargo_number"}
                    placeholder="Илгээлтийн дугаар"
                    label="Илгээлтийн дугаар"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"sent_from"}
                    placeholder="Хаанаас илгээсэн /Өртөө/"
                    label="Хаанаас илгээсэн /Өртөө/"
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
                    name={"reciever"}
                    placeholder="Тээврийн чиглэл"
                    label="Тээврийн чиглэл"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"cargo_type"}
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
                    name={"clean_weight"}
                    placeholder="Цэвэр жин"
                    label="Цэвэр жин"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"dirty_weight"}
                    placeholder="Бохир жин"
                    label="Бохир жин"
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
                    name={"reciever"}
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
                    name={"phone"}
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
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
