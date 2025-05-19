import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import React, { useRef } from "react";
import { CargoApproachList } from "service/feild_registration/type";
import { CapacityOptions, DirectionOptions } from "utils/options";

interface ContainerProps {
  data: CargoApproachList;
}
const Container: React.FC<ContainerProps> = ({ data }) => {
  const form = useRef<ProFormInstance>();
  return (
    <ProForm initialValues={data} formRef={form} submitter={false}>
      <>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              name={"category"}
              disabled
              label={"Төрөл"}
            />
          </Col>
          <Col span={10}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name={"container_code"}
              label={"Чингэлэг дугаар"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={10}>
            <ProFormSelect
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["broker", "name"]}
              label={"Зуучийн нэр"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ProFormSelect
              fieldProps={{
                size: "large",
              }}
              disabled
              options={CapacityOptions?.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              name={"capacity"}
              label={"Даац"}
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
              disabled
              name={"direction"}
              label="Чиглэл"
              options={DirectionOptions?.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
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
                onChange: (e) => {
                  console.log(e, "lll");
                },
              }}
              disabled
              rules={FORM_ITEM_RULE()}
              label="Дөхөлтийн мэдээний огноо"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ProFormDatePicker
              fieldProps={{
                size: "large",
              }}
              disabled
              name="arrived_at_site"
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
                disabled
                name={"opened_at"}
                label="Задарсан"
              />
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
                disabled
                name={"freed_at"}
                label="Суларсан"
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex items-center gap-3">
              <ProFormDatePicker
                fieldProps={{
                  size: "large",
                }}
                disabled
                name={"left_site_at"}
                label="Т-c явсан"
              />
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
                name={"returned_at"}
                disabled
                label="Буцаж ирсэн"
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex items-center gap-3">
              <ProFormDatePicker
                fieldProps={{
                  size: "large",
                }}
                name={"shipped_at"}
                disabled
                label="Ачилт хийсэн"
              />
            </div>
          </Col>
        </Row>
        <div className="text-xl font-medium mb-3">Олголт</div>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["assignation", "waggon_number"]}
              label="Вагоны дугаар"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["assignation", "shipping_number"]}
              label="Илгээлтийн дугаар"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["assignation", "direction"]}
              label="Тээврийн чиглэл"
            />
          </Col>
          <Col span={12}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["assignation", "cargo_name"]}
              label="Ачааны нэр төрөл"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ProFormDigit
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["assignation", "net_weight"]}
              label="Цэвэр жин"
            />
          </Col>
          <Col span={12}>
            <ProFormDigit
              fieldProps={{
                size: "large",
              }}
              disabled
              name={["assignation", "gross_weight"]}
              label="Бохир жин"
            />
          </Col>
        </Row>
      </>
    </ProForm>
  );
};

export default Container;
