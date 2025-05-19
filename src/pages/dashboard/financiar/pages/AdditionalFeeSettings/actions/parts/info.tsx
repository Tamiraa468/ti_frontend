import {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, notification, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE } from "config";
import { useEffect } from "react";
import categoryType from "service/fininaciar/categoryType";
import { CreateCapacityOptions } from "utils/options";

export const Info = () => {
  const categoryTypeList = useRequest(categoryType.list, {
    manual: true,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  useEffect(() => {
    categoryTypeList.runAsync({ is_all: true });
  }, []);

  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormSelect
            mode="multiple"
            // request={async () => {
            //   const res = await categoryTypeList.runAsync({ is_all: true });
            //   return res?.items.map((item) => ({
            //     label: (
            //       <div className="flex gap-2">
            //         <div>{item.code}</div> - <div>{item.name}</div>
            //       </div>
            //     ),
            //     value: item.id,
            //   }));
            // }}
            options={categoryTypeList?.data?.items?.map((item) => ({
              label: (
                <div className="flex gap-2">
                  <div>{item.code}</div> - <div>{item.name}</div>
                </div>
              ),
              value: item.id,
            }))}
            name="category_ids"
            placeholder="Ангилал код"
            label={"Ангилал код"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"fee_code"}
            placeholder={"Хураамжийн код"}
            label="Хураамжийн код"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"fee_name"}
            placeholder={"Хураамжийн нэр"}
            label="Хураамжийн нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"unit_measurement"}
            placeholder={"Хэмжих нэгж"}
            label="Хэмжих нэгж"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"fee_amount"}
            placeholder={"Хураамжийн дүн"}
            label="Хураамжийн дүн"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            name={"capacity"}
            options={CreateCapacityOptions?.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            placeholder="Даац"
            label={"Даац"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <ProFormRadio.Group
            name="is_default"
            radioType="radio"
            label="Тогтмол эсэх"
            fieldProps={{
              size: "middle",
            }}
            options={[
              {
                label: "Тийм",
                value: "true",
              },
              {
                label: "Үгүй",
                value: "false",
              },
            ]}
            initialValue="assignation"
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
