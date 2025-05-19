import ProForm, {
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { ITable } from "components/table";
import { FORM_ITEM_RULE, PaymentType } from "config";
import { useEffect, useRef } from "react";
import {
  AdditionalFeeTicketCalculated,
  CargoApproachList,
  Ticket,
} from "service/feild_registration/type";

interface GrantProps {
  data: CargoApproachList;
  assignationData: Ticket;
}
const Grant: React.FC<GrantProps> = ({ data, assignationData }) => {
  const form = useRef<ProFormInstance>();

  useEffect(() => {
    form.current?.setFieldsValue({
      ...data,
      ticket_number: assignationData?.ticket_number,
      date: assignationData?.date,
      category_fee_id: assignationData?.additional_fee_category?.name,
      cargo_weight: assignationData?.cargo_weight,
      payment_date: assignationData?.debit?.created_at,
      payment_type:
        assignationData?.debit?.payment_type &&
        assignationData?.debit?.payment_type === PaymentType.cash
          ? "Бэлэн"
          : "Бэлэн бус",
      payment_amount: assignationData?.debit?.total_amount,
      payer_name: assignationData?.debit?.payer_name,
      ledger_id: assignationData?.debit?.ledger?.name,
    });
  }, [data, assignationData]);

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
            <ProFormSelect
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
          dataSource={assignationData?.additional_fee_ticket_calculated ?? []}
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
              disabled
              placeholder="Огноо"
              label="Огноо"
            />
          </Col>
          <Col span={5}>
            <ProFormSelect
              name="payment_type"
              placeholder="Төлөлтийн хэлбэр"
              disabled
              label="Төлөлтийн хэлбэр"
            />
          </Col>
          <Col span={5}>
            <ProFormText
              name="payment_amount"
              placeholder="Мөнгөн дүн"
              disabled
              label="Мөнгөн дүн"
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
              disabled
              placeholder="Төлөгч"
              label="Төлөгч"
            />
          </Col>
        </Row>
      </>
    </ProForm>
  );
};

export default Grant;
