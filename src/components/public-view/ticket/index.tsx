import ProForm, {
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { ITable } from "components/table";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import additionalFeeDebit from "service/feild_registration/additionalFeeDebit";
import {
  AdditionalFeeTicketCalculated,
  Ticket,
} from "service/feild_registration/type";

import { downloadPDF, generatePDF } from "utils/pdf_generate";

interface TicketDataProps {
  ticket: Ticket;
}
const TicketDetails: React.FC<TicketDataProps> = ({ ticket }) => {
  const form = useRef<ProFormInstance>();

  useEffect(() => {
    form.current?.setFieldsValue({
      ticket_number: ticket?.ticket_number,
      date: ticket?.date,
      category_fee_id: ticket?.additional_fee_category?.name,
      cargo_weight: ticket?.cargo_weight,
      payment_date: ticket?.debit?.created_at,
      payment_type: ticket?.debit?.payment_type,
      payment_amount: ticket?.debit?.total_amount,
      payer_name: ticket?.debit?.payer_name,
      ledger_id: ticket?.debit?.ledger?.name,
    });
  }, [ticket]);

  const addAdditionalFeeDebit = useRequest(additionalFeeDebit.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хадгалагдлаа",
      });
    },
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const onClickGeneratePDF = async () => {
    const data = await generatePDF({
      date: ticket?.date ? dayjs(ticket.date).format("YYYY.MM.DD") : "",
      items:
        ticket?.additional_fee_ticket_calculated?.map((item) => {
          return {
            name: item?.fee_name || "",
            amount: item?.total_amount || 0,
          };
        }) || [],
      company: ticket?.debit?.ledger?.customer_company?.name || "",
      serialNumber: ticket?.ticket_number || "",
      title: form.current?.getFieldValue("category_fee_id") || "",
      taxNumber: "100",
      containerInfo: {
        number: `${ticket?.container_transport_record?.container_code || ""} ${
          ticket?.cargo_weight || ""
        }`,
        date: ticket?.date ? dayjs(ticket.date).format("YYYY.MM.DD") : "",
      },
      totalAmount: ticket?.debit?.total_amount || 0,
      cashAmount:
        ticket?.debit?.transaction?.payment_type === "cash"
          ? ticket?.debit?.total_amount || 0
          : 0,
      nonCashAmount: ticket?.debit?.total_amount || 0,
      amountInWords: "",
      submitter: ticket?.debit?.payer_name || "",
    });
    downloadPDF(data);
  };

  return (
    <ProForm formRef={form} submitter={false}>
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
          dataSource={ticket?.additional_fee_ticket_calculated ?? []}
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

        <div className="grid grid-cols-4 gap-2 mb-3">
          <Button
            className="col-start-4"
            size="middle"
            onClick={onClickGeneratePDF}
          >
            Хэвлэх
          </Button>
        </div>
      </>
    </ProForm>
  );
};

export default TicketDetails;
