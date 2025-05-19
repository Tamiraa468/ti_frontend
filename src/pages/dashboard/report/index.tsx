import { ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification, Typography } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { FORM_ITEM_RULE, PaymentType } from "config";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import additionalFeeCategory from "service/additional_fee_record";
import additionalFeeDebit from "service/feild_registration/additionalFeeDebit";
import { CargoApproachList } from "service/feild_registration/type";
import addinitionalFeeSettings from "service/fininaciar/additionalFeeSettings";
import { moneyFormat, reportPaginate } from "utils/index";

const ReportPage: React.FC = () => {
  const [filter, setFilter] = useState(reportPaginate);
  const [search, setSearch] = useState<string>("");
  const [columnData, setColumnData] = useState<any>([]);
  const reportList = useRequest(additionalFeeDebit.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
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

  const additionalList = useRequest(addinitionalFeeSettings.list, {
    manual: true,
  });

  useEffect(() => {
    reportList.run({
      ...filter,
    });

    categoryList.run({
      is_all: true,
    });

    const columnData = sd();

    console.log(columnData, "golog2");
  }, [filter]);

  const refreshList = () => {
    reportList?.run({
      ...filter,
    });
  };

  const searchRun = useDebounceFn(reportList.run, { wait: 1000 });

  // const fildArray = () => {
  //   const feeMap = new Map<number, string>();

  //   additionalList?.data?.items?.forEach((additionalItem) => {
  //     additionalItem.categories.forEach((category) => {
  //       feeMap.set(additionalItem.id, additionalItem.fee_name);
  //     });
  //   });

  //   const result: string[] = [];

  //   categoryList?.data?.items?.forEach((item) => {
  //     const feeName = feeMap.get(item.id);
  //     if (feeName) {
  //       result.push(feeName);
  //     } else {
  //     }
  //   });

  //   return result;
  // };

  // fildArray();
  const { Text } = Typography;
  const sd = async () => {
    const data = await additionalList.runAsync({
      is_all: true,
    });

    const columnData = data?.items?.map((item: any) => {
      return {
        title: item.fee_name,
        dataIndex: item.fee_name,
        render: (value: any) => {
          if (typeof value === "number") {
            return moneyFormat(value || 0) || "";
          } else {
            return "";
          }
        },
      };
    });
    setColumnData(columnData);

    return columnData;
  };

  // const tableData = reportList?.data?.items?.map((item) => {
  //   return item?.ticket?.additional_fee_ticket_calculated?.map((one: any) => {
  //     const columnData = fildArray();
  //     const foundData = columnData.find((oneFild) => {
  //       console.log("gichiii ymaa", one.fee_name, oneFild);
  //       if (oneFild == one.fee_name) {
  //         return one;
  //       }
  //     });
  //     if (foundData) {
  //       return one;
  //     }
  //   });
  // });

  // console.log("tableData", tableData);

  const tableData =
    reportList?.data?.items?.map((el) => {
      return el?.Flattened;
    }) ?? [];

  const customColumn = tableData.push();

  console.log(tableData, "tableData");
  return (
    <PageCard xR>
      <InitTableHeader
        leftContent={
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-700">
              Нийт ({reportList?.data?.total})
            </div>
            <DatePicker.RangePicker
              className="w-max"
              placeholder={["Эхлэх огноо", "Дуусах огноо"]}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                  end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                });
              }}
              defaultValue={[
                filter.start_date
                  ? dayjs(filter.start_date)
                  : dayjs().subtract(3, "month"),
                filter.end_date ? dayjs(filter.end_date) : dayjs(),
              ]}
            />
          </div>
        }
        filter={
          <ProFormSelect
            fieldProps={{
              size: "large",
              onChange: (e) => {
                setFilter({ ...filter, additional_fee_category_id: e as any });
              },
            }}
            options={categoryList?.data?.items?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            name="additional_fee_category_id"
            placeholder="Сонгох"
            rules={FORM_ITEM_RULE()}
          />
        }
        hideTitle
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, search: e });
        }}
        refresh={refreshList}
        hideCreate
        fileName="RemainderCargo"
        // hideDownload
      />
      <ITable<CargoApproachList>
        dataSource={
          reportList?.data?.items?.map((el) => {
            return el?.Flattened;
          }) ?? []
        }
        // summary={(pageData) => {
        //   let totalBorrow = 0;
        //   let totalRepayment = 0;
        //   pageData.forEach(({ borrow, repayment }) => {
        //     totalBorrow += borrow;
        //     totalRepayment += repayment;
        //   });
        //   return (
        //     <>
        //       <Table.Summary.Row>
        //         <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
        //         <Table.Summary.Cell index={1}>
        //           <Text type="danger">{totalBorrow}</Text>
        //         </Table.Summary.Cell>
        //         <Table.Summary.Cell index={2}>
        //           <Text>{totalRepayment}</Text>
        //         </Table.Summary.Cell>
        //       </Table.Summary.Row>
        //     </>
        //   );
        // }}
        loading={reportList.loading}
        refresh={refreshList}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Баримт дугаар",
            dataIndex: "ticket_number",
          },
          {
            title: "Төлбөр үүсгэсэн огноо",
            dataIndex: "date",
            render: (_: any, record: any) => {
              return dayjs(record?.date).format("YYYY-MM-DD");
            },
          },
          {
            title: "Төлбөр төлөгчийн нэр",
            dataIndex: "payer_name",
          },
          {
            title: "Төлбөрийн төрөл",
            dataIndex: "payer_name",
            render: (_: any, record: any) => {
              return record?.payment_type === PaymentType.cash
                ? "Бэлэн"
                : "Бэлэн бус";
            },
          },
          {
            title: "Нийт төлбөр",
            dataIndex: "total_amount",
            render: (value: any) => {
              if (typeof value === "number") {
                return moneyFormat(value);
              } else {
                return "";
              }
            },
          },
          ...columnData,
        ]}
      />
    </PageCard>
  );
};

export default ReportPage;
