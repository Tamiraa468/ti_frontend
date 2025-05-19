import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, notification, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE } from "config";
import ledger from "service/fininaciar/accountSettlement/ledger";
import { PaymentMethod } from "utils/options";

export const Info = () => {
  const list = useRequest(ledger.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDatePicker
            fieldProps={{
              size: "large",
            }}
            name="created_at"
            label={<div className="text-gray-700 font-medium ">Огноо</div>}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label={<div className="font-medium text-gray-700">Данс</div>}
            name={"ledger_id"}
            shouldUpdate
            className="flex items-center justify-center "
            fieldProps={{
              showSearch: true,
              loading: list.loading,
              filterOption: false,
              size: "large",
            }}
            placeholder={"Данс"}
            request={async (value) => {
              const res = await list.runAsync({
                is_all: true,
              });
              return res?.items?.map((item: any) => ({
                label: `${item?.customer_company?.name} - ${item?.name}`,
                value: item?.id,
              }));
            }}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormSelect
            name="payment_type"
            placeholder="Төлөлтийн хэлбэр"
            options={PaymentMethod.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            label="Төлөлтийн хэлбэр"
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"amount"}
            placeholder={"Мөнгөн дүн"}
            label="Мөнгөн дүн"
            min={0}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDigit
            name={"barimt"}
            placeholder={"Баримт"}
            label="Баримт"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"payer"}
            placeholder={"Төлөгч"}
            label="Төлөгч"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </SectionContainer>
  );
};
