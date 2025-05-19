import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { ActionType, EditableProTable } from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Button, Col, Form, notification, Row, Select } from "antd";
import IBadge from "components/badge";
import { ITable } from "components/index";
import { FORM_ITEM_RULE } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import additionalFeeCategory from "service/additional_fee_record";
import fieldRegistration from "service/feild_registration";
import additionalFeeDebit from "service/feild_registration/additionalFeeDebit";
import {
  CargoApproachList,
  TicketAdditionalFeeType,
} from "service/feild_registration/type";
import ledger from "service/fininaciar/accountSettlement/ledger";
import addinitionalFeeSettings from "service/fininaciar/additionalFeeSettings";
import { AdditionalFeeType } from "service/fininaciar/additionalFeeSettings/type";
import { ActionComponentProps } from "types";
import { moneyFormat } from "utils/index";
import { CapacityOptions, PaymentMethod } from "utils/options";
import { downloadPDF, generatePDF } from "utils/pdf_generate";

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const computeDate = (date1?: string, date2?: string) => {
  if (!date1 || !date2) {
    return 0;
  }
  return dayjs(date1).diff(dayjs(date2), "day");
};

export const AssignationCreate: React.FC<
  ActionComponentProps<CargoApproachList>
> = ({ onCancel, onFinish, open, detail }) => {
  const [user] = useContext(AuthContext);
  const [additionalFee, setAdditionalFee] = useState<AdditionalFeeType[]>([]);
  const [allAdditionalFee, setAllAdditionalFee] = useState<AdditionalFeeType[]>(
    [],
  );
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [paymentList, setPaymentList] = useState<any[]>([]);
  const [dates, setDates] = useState({
    opened: computeDate(detail?.opened_at, detail?.arrived_at_site) || 0,
    freed: computeDate(detail?.freed_at, detail?.opened_at) || 0,
    left_site: computeDate(detail?.left_site_at, detail?.opened_at) || 0,
    returned: computeDate(detail?.returned_at, detail?.left_site_at) || 0,
    shipped: 0,
  });
  const [ticketAdditional, setTicketAdditional] =
    useState<TicketAdditionalFeeType>();

  const [bankListData, setBankListData] = useState<any[]>([]);

  const actionRef = useRef<ActionType>();
  const updateArrivalField = useRequest(fieldRegistration.updateRegistration, {
    manual: true,
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onCancel?.();
    },
  });

  const categoryList = useRequest(additionalFeeCategory.list, {
    manual: true,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const additionalFeeByCategory = useRequest(
    addinitionalFeeSettings.byCategory,
    {
      manual: true,
      onError: (error) => {
        notification.error({
          message: error.message,
        });
      },
    },
  );

  const ticketAdditionalFee = useRequest(
    fieldRegistration.ticketAdditionalFee,
    {
      manual: true,
      onError: (error) => {
        notification.error({
          message: error.message,
        });
      },
    },
  );

  const getTempAdditionalFee = useRequest(
    fieldRegistration.getTempAdditionalFee,
    {
      manual: true,
    },
  );

  const bankList = useRequest(ledger.list, {
    manual: true,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const addAdditionalFeeDebit = useRequest(additionalFeeDebit.create, {
    manual: true,
    onSuccess: () => {
      onFinish?.();
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

  const [form] = Form.useForm();

  useEffect(() => {
    const fetch = async () => {
      const res = await getTempAdditionalFee.runAsync(
        {
          shipping_or_assignment: "assignment",
        },
        detail?.id as number,
      );
      form.setFieldsValue({
        ...res,
      });
      const resData =
        res?.additional_fee_ticket_calculated?.map((values): any => {
          return {
            ...values,
            fee_amount: values?.fee_amount,
            number_1: values.number_1,
            number_2: values.number_2,
            total_amount: values.total_amount,
          };
        }) || [];
      setAdditionalFee(resData);
      setAllAdditionalFee(resData);
      setEditableRowKeys(
        res?.additional_fee_ticket_calculated?.map((item) => item.id) || [],
      );
    };
    fetch();
    form.setFieldsValue({
      ...detail,
      broker_name: detail?.broker?.name,
      cargo_weight: detail?.capacity,
    });
  }, [detail?.id]);

  const totalAmount = useMemo(() => {
    return additionalFee.reduce((acc, curr) => acc + curr.total_amount, 0);
  }, [additionalFee]);

  // calc total amount function
  const calcTotalAmount = (record: any, values: any) => {
    const index = additionalFee.findIndex((item) => item.id === record.id);
    additionalFee[index] = {
      ...additionalFee[index],
      ...values,
    };

    additionalFee[index].total_amount =
      (additionalFee[index].fee_amount || 0) *
      (additionalFee[index].number_1 || 0) *
      (additionalFee[index].number_2 || 0);
    setAdditionalFee([...additionalFee]);
  };

  const calcDateNumberAdditionalFee = (diff: number) => {
    const data = additionalFee.map((item) => {
      if (item.fee_name.includes("Краны өргөлт")) {
        return {
          ...item,
          number_1: 2,
          total_amount: item.fee_amount * 2,
        };
      }
      if (item.fee_name.includes("Ачаа хадгаламж")) {
        return {
          ...item,
          number_1: diff,
          total_amount: item.fee_amount * diff,
        };
      }
      return item;
    });
    setAdditionalFee(data);
  };

  return (
    <ModalForm
      form={form}
      onFinish={async (values) => {
        const data = await ticketAdditionalFee.runAsync({
          additional_fees: additionalFee.map((values) => {
            return {
              additional_fee_id: values.id,
              number_1: values.number_1,
              number_2: values.number_2,
              total_amount: values.total_amount,
              fee_name: values.fee_name,
              fee_code: values.fee_code,
              unit_measurement: values.unit_measurement,
              fee_amount: values.fee_amount,
              is_new: values.is_new,
            };
          }),
          shipping_or_assignment: "assignment",
          cargo_weight: form.getFieldValue("cargo_weight"),
          additional_fee_category_id: form.getFieldValue(
            "additional_fee_category_id",
          ),
          date: dayjs(form.getFieldValue("opened_at")),
          ticket_number: form.getFieldValue("ticket_number"),
          container_transport_record_id: detail?.id,
        });

        setTicketAdditional(data);

        console.log("FREED_AT", values.freed_at);
        await updateArrivalField.runAsync(
          {
            opened_at: values.opened_at ? dayjs(values.opened_at) : undefined,
            left_site_at: values.left_site_at
              ? dayjs(values.left_site_at)
              : undefined,
            freed_at: values.freed_at ? dayjs(values.freed_at) : undefined,
            returned_at: values.returned_at
              ? dayjs(values.returned_at)
              : undefined,
            shipped_at: values.shipped_at
              ? dayjs(values.shipped_at)
              : undefined,
          },
          detail?.id as number,
        );
        await addAdditionalFeeDebit.runAsync({
          ...values,
          date: values.opened_at,
          ticket_id: data?.id || getTempAdditionalFee.data?.id,
          total_amount: totalAmount,
        });
      }}
      title="Олголт "
      // initialValues={
      // {
      // arrived_at_site: detail?.arrived_at_site,
      // opened_at: detail?.opened_at,
      // freed_at: detail?.freed_at,
      // left_site_at: detail?.left_site_at,
      // returned_at: detail?.returned_at,
      // shipped_at: detail?.shipped_at,
      // container_code: detail?.container_code,
      // capacity: detail?.capacity,
      // broker_name: detail?.broker?.name,
      // ticket_number: getTempAdditionalFee.data?.ticket_number,
      // date: getTempAdditionalFee.data?.date,
      // cargo_weight:
      //   getTempAdditionalFee.data?.cargo_weight || detail?.capacity,
      // additional_fee_category_id:
      //   getTempAdditionalFee.data?.additional_fee_category_id,
      // payment_amount: totalAmount,
      // }
      // }
      open={open}
      modalProps={{
        destroyOnClose: true,
        width: "1200px",
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
                loading={updateArrivalField.loading}
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
                <Col span={10}>
                  <ProFormText
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name={"container_code"}
                    placeholder="Чингэлэг дугаар"
                    label={"Чингэлэг дугаар"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={4}>
                  <ProFormSelect
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    options={CapacityOptions?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    name={"capacity"}
                    placeholder="Даац"
                    label={"Даац"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={10}>
                  <ProFormText
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name="broker_name"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name={"arrived_at_site"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Олголт</div>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          if (e === null || e === undefined) {
                            return;
                          }
                          setDates({
                            ...dates,
                            opened: dayjs(e).diff(
                              dayjs(form.getFieldValue("arrived_at_site")),
                              "day",
                            ),
                          });
                        },
                      }}
                      name={"opened_at"}
                      placeholder="Задарсан"
                      label="Задарсан"
                    />
                    <IBadge
                      title={dates.opened <= 0 ? 0 : dates.opened}
                      color="blue"
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      name="freed_at"
                      placeholder="Суларсан"
                      label="Суларсан"
                      // disabled={dates.left_site > 0 || dates.opened <= 0}
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          if (e === null || e === undefined) {
                            return;
                          }
                          let diff = dayjs(e).diff(
                            dayjs(form.getFieldValue("opened_at")),
                            "day",
                          );
                          calcDateNumberAdditionalFee(diff);
                          setDates({
                            ...dates,
                            freed: dayjs(e).diff(
                              dayjs(form.getFieldValue("opened_at")),
                              "day",
                            ),
                          });
                        },
                      }}
                    />
                    <IBadge
                      title={dates.freed <= 0 ? 0 : dates.freed}
                      color="blue"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      // disabled={dates.freed > 0 || dates.opened <= 0}
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          if (e === null || e === undefined) {
                            return;
                          }
                          let diff = dayjs(e).diff(
                            dayjs(form.getFieldValue("opened_at")),
                            "day",
                          );
                          calcDateNumberAdditionalFee(diff);
                          setDates({
                            ...dates,
                            left_site: diff,
                          });
                        },
                      }}
                      name={"left_site_at"}
                      placeholder="Т-c явсан"
                      label="Т-c явсан"
                    // rules={FORM_ITEM_RULE()}
                    />
                    <IBadge
                      title={dates?.left_site <= 0 ? 0 : dates.left_site}
                      color="blue"
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      name={"returned_at"}
                      placeholder="Буцаж ирсэн"
                      label="Буцаж ирсэн"
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          if (e === null || e === undefined) {
                            return;
                          }
                          setDates({
                            ...dates,
                            returned:
                              dayjs(e).diff(
                                dayjs(form.getFieldValue("left_site_at")),
                                "day",
                              ) || 0,
                          });
                        },
                      }}
                    />
                    <IBadge
                      title={dates?.returned <= 0 ? 0 : dates.returned}
                      color="blue"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      disabled
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          setDates({
                            ...dates,
                            shipped:
                              dayjs(e).diff(
                                dayjs(form.getFieldValue("freed_at")),
                                "day",
                              ) || 0,
                          });
                        },
                      }}
                      name={"shipped_at"}
                      placeholder="Ачилт хийсэн"
                      label="Ачилт хийсэн"
                    />
                    {/* <IBadge title={dates?.shipped} color="blue" /> */}
                  </div>
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">
                Элдэв хураамжийн жагсаалт
              </div>
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
                  />
                </Col>
                <Col span={6}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    disabled
                    name={"opened_at"}
                    placeholder="Он сар өдөр"
                    label={"Он сар өдөр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={6}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                      onChange: async (value) => {
                        const data = await additionalFeeByCategory.runAsync({
                          category_id: value,
                          capacity: form.getFieldValue("cargo_weight"),
                        });

                        const resData = data?.items?.map((values) => {
                          return {
                            ...values,
                            total_amount:
                              values?.number_1 *
                              values?.fee_amount *
                              values?.number_2,
                          };
                        });
                        const defaultAdditionalData = resData?.filter(
                          (item) => item.is_default === "true",
                        );

                        const finalAdditionalData = defaultAdditionalData?.map(
                          (values) => {
                            if (values.fee_name.includes("Краны өргөлт")) {
                              return {
                                ...values,
                                number_1: 2,
                                total_amount: values.fee_amount * 2,
                              };
                            }
                            if (values.fee_name.includes("Ачаа хадгаламж")) {
                              let day =
                                dates.left_site > 0
                                  ? dates.left_site
                                  : dates.freed <= 0
                                    ? 1
                                    : dates.freed;
                              return {
                                ...values,
                                number_1: day,
                                total_amount: values.fee_amount * day,
                              };
                            }
                            return values;
                          },
                        );

                        setAdditionalFee(finalAdditionalData || []);
                        setAllAdditionalFee(resData || []);
                      },
                    }}
                    request={async () => {
                      const res = await categoryList.runAsync({ is_all: true });
                      return res?.items.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }));
                    }}
                    name="additional_fee_category_id"
                    placeholder="Ангилал"
                    label={"Ангилал"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={6}>
                  <ProFormSelect
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name="cargo_weight"
                    options={CapacityOptions?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    placeholder="Ачааны жин"
                    label={"Ачааны жин"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <EditableProTable<AdditionalFeeType>
                rowKey="id"
                title={() => {
                  return (
                    <div className="bg-[#f9fafb] p-3 flex justify-between items-center text-[#475467]">
                      <div>{additionalFee.length} хураамж</div>
                      <div>Нийт өртөг: {moneyFormat(totalAmount)}</div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Button
                          size="middle"
                          onClick={() => {
                            form.setFieldValue("payment_amount", totalAmount);
                          }}
                        >
                          Төлөлтийн жагсаалт нэмэх
                        </Button>
                        <Button
                          size="middle"
                          type="default"
                          onClick={() => {
                            const id = (Math.random() * 1000000).toFixed(0);
                            const newData: any = {
                              id: Number(id),
                              total_amount: 0,
                              fee_amount: null,
                              fee_code: null,
                              fee_name: null,
                              unit_measurement: null,
                              number_1: 1,
                              number_2: 1,
                              is_new: true,
                            };
                            setAdditionalFee([
                              ...additionalFee,
                              { ...newData },
                            ]);
                            setEditableRowKeys([...editableKeys, id]);
                            // actionRef.current?.addEditRecord({
                            //   id: Math.random() * 1000000,
                            // });
                          }}
                        >
                          Э/Х нэмэх
                        </Button>
                      </div>
                    </div>
                  );
                }}
                scroll={{
                  x: 1360,
                }}
                className="p-0 remove-padding-table"
                bordered
                recordCreatorProps={false}
                loading={false}
                actionRef={actionRef}
                columns={[
                  {
                    title: "Код",
                    dataIndex: "fee_code",
                    key: "fee_code",
                    className: "p-3",
                    renderFormItem: (_, { record }: any) => {
                      const currentRecord =
                        additionalFee.find((item) => item.id === record.id) ||
                        record;
                      return (
                        <ProFormText
                          fieldProps={{
                            value: currentRecord?.fee_code,
                          }}
                          name="fee_code"
                          placeholder="Код"
                          noStyle
                        />
                      );
                    },
                  },
                  {
                    title: "Хураамжийн нэр",
                    dataIndex: "fee_name",
                    width: 250,
                    key: "fee_name",
                    renderFormItem: (_, { record }: any) => {
                      return (
                        <Select
                          options={allAdditionalFee?.map((item) => {
                            return {
                              label: item.fee_name,
                              value: item.id,
                            };
                          })}
                          onChange={(e) => {
                            const index = allAdditionalFee?.findIndex(
                              (item: any) => {
                                return item.id === e;
                              },
                            );

                            record = {
                              ...allAdditionalFee[index],
                              ...record,
                            };

                            calcTotalAmount(record, {
                              fee_name: allAdditionalFee[index].fee_name,
                              fee_code: allAdditionalFee[index].fee_code,
                              fee_amount: allAdditionalFee[index].fee_amount,
                              unit_measurement:
                                allAdditionalFee[index].unit_measurement,
                            });
                          }}
                        />
                      );
                    },
                  },
                  {
                    title: "Хэмжих нэгж",
                    dataIndex: "unit_measurement",
                    key: "unit_measurement",
                    renderFormItem: (_, { record }: any) => {
                      const currentRecord =
                        additionalFee.find((item) => item.id === record.id) ||
                        record;
                      return (
                        <ProFormText
                          noStyle
                          fieldProps={{
                            value: currentRecord?.unit_measurement,
                            onChange: (e) => {
                              calcTotalAmount(record, {
                                unit_measurement: e.target.value,
                              });
                            },
                          }}
                          name="unit_measurement"
                          placeholder="Хэмжих нэгж"
                        />
                      );
                    },
                  },
                  {
                    title: "Өртөг",
                    dataIndex: "fee_amount",
                    key: "fee_amount",
                    valueType: "money",
                    renderFormItem: (_, { record }: any) => {
                      const currentRecord =
                        additionalFee.find((item) => item.id === record.id) ||
                        record;
                      return (
                        <ProFormDigit
                          noStyle
                          fieldProps={{
                            value: currentRecord?.fee_amount,
                            onChange: (e) => {
                              calcTotalAmount(record, {
                                fee_amount: e,
                              });
                            },
                          }}
                          name="fee_amount"
                          placeholder="Өртөг"
                        />
                      );
                    },
                  },
                  {
                    title: "Тоо 1",
                    dataIndex: "number_1",
                    key: "number_1",
                    valueType: "digit",
                    fieldProps: {
                      min: 1,
                    },
                    renderFormItem: (_, { record }: any) => {
                      const currentRecord =
                        additionalFee.find((item) => item.id === record?.id) ||
                        record;
                      return (
                        <ProFormDigit
                          noStyle
                          fieldProps={{
                            value: currentRecord?.number_1,
                            onChange: (e) => {
                              calcTotalAmount(record, {
                                number_1: e,
                              });
                            },
                          }}
                          name="number_1"
                          placeholder="Тоо 1"
                        />
                      );
                    },
                  },
                  {
                    title: "Тоо 2",
                    dataIndex: "number_2",
                    key: "number_2",
                    valueType: "digit",
                    fieldProps: {
                      min: 1,
                    },
                    renderFormItem: (_, { record }: any) => {
                      const currentRecord =
                        additionalFee.find((item) => item.id === record?.id) ||
                        record;
                      return (
                        <ProFormDigit
                          noStyle
                          fieldProps={{
                            value: currentRecord?.number_2,
                            onChange: (e) => {
                              calcTotalAmount(record, {
                                number_2: e,
                              });
                            },
                          }}
                          name="number_2"
                          placeholder="Тоо 2"
                        />
                      );
                    },
                  },
                  {
                    title: "Дүн",
                    dataIndex: "total_amount",
                    key: "total_amount",
                    valueType: "money",
                    editable: false,
                  },
                  {
                    title: "Үйлдэл",
                    editable: false,
                    width: 200,
                    render: (text, record, _, action) => [
                      <a
                        onClick={() => {
                          setAdditionalFee(
                            additionalFee.filter(
                              (item) => item.id !== record.id,
                            ),
                          );
                        }}
                      >
                        Хасах
                      </a>,
                    ],
                  },
                ]}
                value={[...additionalFee]}
                // onChange={(value) =>
                //   setAdditionalFee(value as AdditionalFeeType[])
                // }
                editable={{
                  type: "multiple",
                  editableKeys: additionalFee.map((item) => item.id),
                  onSave: async (rowKey, data, row) => {
                    console.log(rowKey, data, row);
                    await waitTime(2000);
                  },
                }}
              />
              {/* <div className="flex justify-end">
                <Button
                  size="middle"
                  type="primary"
                  disabled={additionalFee.length === 0 || !additionalFee}
                  onClick={async () => {
                    const data = await ticketAdditionalFee.runAsync({
                      additional_fees: additionalFee.map((values) => {
                        return {
                          additional_fee_id: values.id,
                          number_1: values.number_1,
                          number_2: values.number_2,
                          total_amount: values.total_amount,
                          fee_name: values.fee_name,
                          fee_code: values.fee_code,
                          unit_measurement: values.unit_measurement,
                          fee_amount: values.fee_amount,
                          is_new: values.is_new,
                        };
                      }),
                      shipping_or_assignment: "assignment",
                      cargo_weight: form.getFieldValue("cargo_weight"),
                      additional_fee_category_id: form.getFieldValue(
                        "additional_fee_category_id"
                      ),
                      ticket_number: form.getFieldValue("ticket_number"),
                      container_transport_record_id: detail?.id,
                    });

                    setTicketAdditional(data);
                  }}
                >
                  Түр хадгалах
                </Button>
              </div> */}
              <div className="text-xl font-medium mb-3">Төлөлтийн жагсаалт</div>
              <ITable<any>
                bordered
                title={() => {
                  return (
                    <div className=" bg-[#f9fafb] p-3 text-[#475467]">
                      <Row gutter={[16, 16]}>
                        <Col span={4}>
                          <ProFormDatePicker
                            name="opened_at"
                            disabled
                            placeholder="Огноо"
                            label="Огноо"
                          />
                        </Col>
                        <Col span={5}>
                          <ProFormSelect
                            name="payment_type"
                            placeholder="Төлөлтийн хэлбэр"
                            initialValue={"non_cash"}
                            options={[
                              {
                                value: "non_cash",
                                label: "Бэлэн бус",
                              },
                            ]}
                            label="Төлөлтийн хэлбэр"
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
                          <ProFormSelect
                            name="ledger_id"
                            placeholder="Данс"
                            onChange={(value) => {
                              const ledger = bankListData.find(
                                (item) => item.id === value,
                              );
                              form.setFieldsValue({
                                payer_name:
                                  ledger?.customer_company?.shortcut_name,
                              });
                            }}
                            label="Данс"
                            request={async () => {
                              const res = await bankList.runAsync({
                                is_all: true,
                                is_broker: true,
                              });
                              setBankListData(res?.items);
                              return res?.items.map((item) => ({
                                label: `${item.customer_company?.name} - ${item.name}`,
                                value: item.id,
                              }));
                            }}
                          />
                        </Col>
                        <Col span={5}>
                          <ProFormSelect
                            name="payer_name"
                            placeholder="Төлөгч"
                            label="Төлөгч"
                            options={bankListData?.map((item) => {
                              return {
                                label: item.customer_company?.shortcut_name,
                                value: item.customer_company?.shortcut_name,
                              };
                            })}
                          />
                        </Col>
                      </Row>
                      <div className="flex justify-end gap-3">
                        <Button
                          size="middle"
                          onClick={() => {
                            setPaymentList([
                              {
                                ticket_number:
                                  form.getFieldValue("ticket_number"),
                                payment_date: form.getFieldValue("opened_at"),
                                payment_type:
                                  form.getFieldValue("payment_type"),
                                payment_amount:
                                  form.getFieldValue("payment_amount"),
                                ledger_id: form.getFieldValue("ledger_id"),
                                payer_name: form.getFieldValue("payer_name"),
                              },
                            ]);
                            form.setFieldValue("payment_amount", totalAmount);
                          }}
                        >
                          Төлөлт нэмэх
                        </Button>
                        <Button
                          size="middle"
                          onClick={() => {
                            setPaymentList([]);
                          }}
                        >
                          Төлөлт хасах
                        </Button>
                        <Button
                          size="middle"
                          onClick={async () => {
                            const data = await generatePDF({
                              date: dayjs(form.getFieldValue("date")).format(
                                "YYYY.MM.DD",
                              ),
                              items: additionalFee?.map((item) => {
                                return {
                                  name: item.fee_name || "",
                                  amount: item.total_amount || 0,
                                };
                              }),

                              company:
                                bankListData?.find(
                                  (item) =>
                                    item.id === form.getFieldValue("ledger_id"),
                                )?.customer_company?.name || "",
                              serialNumber:
                                form.getFieldValue("ticket_number") || "",
                              title: "Олголт",
                              taxNumber: "100",
                              containerInfo: {
                                number: `${detail?.container_code} ${CapacityOptions.find(
                                  (capacity) =>
                                    capacity.value === detail?.capacity,
                                )?.label || ""
                                  }`,
                                date:
                                  dayjs(
                                    form.getFieldValue("payment_date"),
                                  ).format("YYYY.MM.DD") || "",
                              },
                              totalAmount: totalAmount || 0,
                              cashAmount:
                                form.getFieldValue("payment_type") === "cash"
                                  ? totalAmount
                                  : 0,
                              nonCashAmount:
                                form.getFieldValue("payment_type") ===
                                  "non_cash"
                                  ? totalAmount
                                  : 0,
                              amountInWords: "",
                              submitter: `${user?.user?.last_name.substring(0, 1) || ""
                                } ${user?.user?.first_name || ""}`,
                            });
                            downloadPDF(data);
                          }}
                        >
                          Хэвлэх
                        </Button>
                      </div>
                    </div>
                  );
                }}
                className="p-0 remove-padding-table"
                dataSource={paymentList}
                columns={[
                  {
                    title: "Код",
                    dataIndex: "ticket_number",
                    key: "ticket_number",
                  },
                  {
                    title: "Огноо",
                    dataIndex: "payment_date",
                    key: "payment_date",
                    render: (_, record) => {
                      return dayjs(record.payment_date).format("YYYY-MM-DD");
                    },
                  },
                  {
                    title: "Төлөлтийн хэлбэр",
                    dataIndex: "payment_type",
                    key: "payment_type",
                    render: (_, record) => {
                      return PaymentMethod.find(
                        (item) => item.value === record.payment_type,
                      )?.label;
                    },
                  },
                  {
                    title: "Мөнгөн дүн",
                    dataIndex: "payment_amount",
                    key: "payment_amount",
                  },
                  {
                    title: "Данс",
                    dataIndex: "ledger_id",
                    key: "ledger_id",
                    render: (_, record) => {
                      const ledger = bankListData.find(
                        (item) => item.id === record.ledger_id,
                      );
                      return `${ledger?.customer_company?.name} - ${ledger?.name}`;
                    },
                  },
                  {
                    title: "Төлөгч",
                    dataIndex: "payer_name",
                    key: "payer_name",
                  },
                ]}
              />
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
