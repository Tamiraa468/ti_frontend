import ProForm, {
  ProFormDatePicker,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { ITable } from "components/index";
import { FORM_ITEM_RULE, PaymentType } from "config";
import { useEffect, useRef } from "react";
import {
  AdditionalFeeTicketCalculated,
  CargoApproachList,
  Ticket,
} from "service/feild_registration/type";

interface ShippingProps {
  data: CargoApproachList;
  shipmentData: Ticket;
}
const Shiping: React.FC<ShippingProps> = ({ data, shipmentData }) => {
  const form = useRef<ProFormInstance>();

  useEffect(() => {
    form.current?.setFieldsValue({
      ...data,
      ticket_number: shipmentData?.ticket_number,
      date: shipmentData?.date,
      category_fee_id: shipmentData?.additional_fee_category?.name,
      cargo_weight: shipmentData?.cargo_weight,
      payment_date: shipmentData?.debit?.created_at,
      payment_type:
        shipmentData?.debit?.payment_type &&
        shipmentData?.debit?.payment_type === PaymentType.cash
          ? "Бэлэн"
          : "Бэлэн бус",
      payment_amount: shipmentData?.debit?.total_amount,
      payer_name: shipmentData?.debit?.payer_name,
      ledger_id: shipmentData?.debit?.ledger?.name,
    });
  }, [data, shipmentData]);

  return (
    <ProForm initialValues={data} formRef={form} submitter={false}>
      <>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              name={"ticket_number"}
              placeholder="ЭХ тасалбарын №"
              label={"ЭХ тасалбарын №"}
              rules={FORM_ITEM_RULE()}
              disabled
            />
          </Col>
          <Col span={6}>
            <ProFormDatePicker
              fieldProps={{
                size: "large",
              }}
              disabled
              name={"date"}
              placeholder="Он сар өдөр"
              label={"Он сар өдөр"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={6}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name="category_fee_id"
              placeholder="Ангилал"
              label={"Ангилал"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
          <Col span={6}>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              name="cargo_weight"
              placeholder="Ачааны жин"
              label={"Ачааны жин"}
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>

        <ITable<AdditionalFeeTicketCalculated>
          dataSource={shipmentData?.additional_fee_ticket_calculated ?? []}
          hidePagination
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Код",
              dataIndex: "fee_code",
              key: "fee_code",
            },
            {
              title: "Хураамжийн нэр",
              dataIndex: "fee_name",
              key: "fee_name",
            },
            {
              title: "Хэмжих нэгж",
              dataIndex: "unit_measurement",
              key: "unit_measurement",
            },
            {
              title: "Өртөг",
              dataIndex: "fee_amount",
              key: "fee_amount",
            },
            {
              title: "Тоо 1",
              dataIndex: "number_1",
              key: "number_1",
            },
            {
              title: "Дүн",
              dataIndex: "total_amount",
              key: "total_amount",
            },
          ]}
        />

        <Row gutter={[16, 16]}>
          <Col span={4}>
            <ProFormDatePicker
              name="payment_date"
              placeholder="Огноо"
              label="Огноо"
              disabled
            />
          </Col>
          <Col span={5}>
            <ProFormText
              name="payment_type"
              placeholder="Төлөлтийн хэлбэр"
              // options={PaymentMethod.map((item) => ({
              //   label: item.label,
              //   value: item.value,
              // }))}
              label="Төлөлтийн хэлбэр"
              disabled
            />
          </Col>
          <Col span={5}>
            <ProFormText
              name="payment_amount"
              placeholder="Мөнгөн дүн"
              label="Мөнгөн дүн"
              disabled
            />
          </Col>
          <Col span={5}>
            <ProFormText
              name="ledger_id"
              placeholder="Данс"
              label="Данс"
              disabled
            />
          </Col>
          <Col span={5}>
            <ProFormText
              name="payer_name"
              placeholder="Төлөгч"
              label="Төлөгч"
              disabled
            />
          </Col>
        </Row>
      </>
    </ProForm>
  );
};

export default Shiping;
