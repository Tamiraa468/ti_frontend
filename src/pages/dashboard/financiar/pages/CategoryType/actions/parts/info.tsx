import { ProFormRadio, ProFormText } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { CategoryTypeEnum, FORM_ITEM_RULE } from "config";

export const Info = () => {
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"name"}
            placeholder={"Нэр"}
            label={"Нэр"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"code"}
            placeholder={"Ангилал код"}
            label="Ангилал код"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormRadio.Group
            name="category_type"
            radioType="radio"
            label="Ангилалын төрөл"
            fieldProps={{
              size: "middle",
            }}
            options={[
              {
                label: "Олголт",
                value: CategoryTypeEnum.assignation,
              },
              {
                label: "Ачилт",
                value: CategoryTypeEnum.shipping,
              },
            ]}
            initialValue="assignation"
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
