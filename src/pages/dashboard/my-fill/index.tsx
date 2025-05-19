import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import { Label } from "components/label";
import PublicDetail from "components/public-view";
import InitTableHeader from "components/table-header";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { CargoApproachList } from "service/feild_registration/type";
import { moneyFormat, myFillPaginate } from "utils/index";
import {
  ArrilvelFieldPaymentMethod,
  CapacityOptions,
  DirectionOptions,
} from "utils/options";

const myFill: React.FC = () => {
  const [filter, setFilter] = useState(myFillPaginate);
  const [search, setSearch] = useState<string>("");
  const [user] = useContext(AuthContext);
  const fieldRegister = useRequest(fieldRegistration.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    fieldRegister.run({
      ...filter,
      customer_company_id: user?.user?.customer_company_id,
    });
  }, [filter]);

  const refreshList = () => {
    fieldRegister?.run({
      ...filter,
      customer_company_id: user?.user?.customer_company_id,
    });
  };
  const searchRun = useDebounceFn(fieldRegister.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        leftContent={
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-700">
              <Label title={`Нийт (${fieldRegister?.data?.total || 0})`} />
            </div>
            <DatePicker.RangePicker
              className="w-max"
              placeholder={["Эхлэх огноо", "Дуусах огноо"]}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  between: [
                    dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                    dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                  ],
                });
              }}
              defaultValue={[
                filter.between[0]
                  ? dayjs(filter.between[0])
                  : dayjs().subtract(3, "month"),
                filter.between[1] ? dayjs(filter.between[1]) : dayjs(),
              ]}
            />
          </div>
        }
        hideTitle
        hideCreate
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, search: e });
        }}
        refresh={refreshList}
        fileName="Талбайн бүртгэл"
      />
      <ITable<CargoApproachList>
        dataSource={fieldRegister.data?.items}
        bordered
        loading={fieldRegister.loading}
        DetailComponent={PublicDetail}
        refresh={refreshList}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Чингэлэг",
            dataIndex: "id",
            children: [
              {
                title: "Дөхөлт огноо",
                dataIndex: "approach_report_date",
                render: (value: any) => {
                  if (
                    !value ||
                    dayjs(value).format("YYYY-MM-DD") === "0001-01-01"
                  ) {
                    return <div className="flex items-center">-</div>;
                  }
                  return (
                    <div className="flex items-center">
                      {dayjs(value).format("YYYY-MM-DD")}
                    </div>
                  );
                },
              },
              {
                title: "Чингэлэг дугаар",
                dataIndex: "container_code",
              },
              {
                title: "Статус",
                dataIndex: "status",
                width: 150,
                align: "center",
                render: (_, record) => {
                  return (
                    <div className="flex items-center gap-2 flex-wrap p-2">
                      {record?.tickets.map((ticket, index) => {
                        return (
                          <IBadge
                            key={index}
                            color="blue"
                            title={
                              ticket?.additional_fee_category?.name || " s"
                            }
                          />
                        );
                      })}
                    </div>
                  );
                },
              },
              {
                title: "Орох хил",
                dataIndex: "direction",
                render: (_, record) => {
                  return DirectionOptions.find(
                    (item) => item.value === record?.direction
                  )?.label;
                },
              },
              {
                title: "Ирэх/Явах",
                dataIndex: "transport_direction",
              },
              {
                title: "Үүсгэсэн ажилтан",
                dataIndex: "created_by",
                render: (_, record) => {
                  return record?.created_by?.email;
                },
              },
              {
                title: "Даац",
                dataIndex: "capacity",
                render: (value) => {
                  return (
                    <span className="text-sm text-[#475467] font-normal flex text-center">
                      {CapacityOptions?.find(
                        (capacity) => capacity.value === value
                      )?.label || "-"}
                    </span>
                  );
                },
              },
              {
                title: "Зуучийн нэр",
                dataIndex: "broker_name",
                render: (_, record) => {
                  return record?.broker?.name;
                },
              },
              {
                title: "Ачааны нэр төрөл",
                dataIndex: "cargo_name",
                render: (_, record) => {
                  return record?.container_cargo?.cargo_name;
                },
              },
              {
                title: "Тээврийн хөлс",
                dataIndex: "transport_fee",
                render: (_, record) => {
                  return moneyFormat(record?.transport_recieve?.transport_fee);
                },
              },
              {
                title: "Валют",
                dataIndex: "currency",
                render: (_, record) => {
                  return record?.transport_recieve?.currency;
                },
              },
              {
                title: "Харилцагчын нэр",
                dataIndex: "customer_company_id",
                render: (_, record) => {
                  return record?.transport_recieve?.customer_company_name;
                },
              },
              {
                title: "Төлөх арга",
                dataIndex: "payment_method",
                render: (_, record) => {
                  return ArrilvelFieldPaymentMethod.find(
                    (item) =>
                      item.value === record?.transport_recieve?.payment_method
                  )?.label;
                },
              },
              {
                title: "Э/Хураамж санамж",
                dataIndex: "additional_fee_note",
                render: (_, record) => {
                  return record?.transport_recieve?.additional_fee_note;
                },
              },
              {
                title: "Шилжүүлэх тээврийн хөлс",
                dataIndex: "transfer_fee",
                render: (_, record) => {
                  return moneyFormat(record?.transport_give?.transfer_fee);
                },
              },
              {
                title: "Гадаад тээвэр зууч",
                dataIndex: "transport_broker",
                render: (_, record) => {
                  return record?.transport_give?.foreign_customer_company?.name;
                },
              },
              {
                title: "Төлбөр хариуцагчийн нэр",
                dataIndex: "transfer_broker_name",
                render: (_, record) => {
                  return record?.transport_give?.transfer_broker_name;
                },
              },
            ],
          },
          {
            title: "Талбайн бүртгэл",
            dataIndex: "id",
            children: [
              {
                title: "Зууч код",
                dataIndex: "transport_give",
                render: (_, record) => {
                  return record?.transport_give?.foreign_customer_company?.code;
                },
              },
              {
                title: "Талбайд ирсэн",
                dataIndex: "arrived_at_site",
                render: (value: any) => {
                  if (!value) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Талбайд задарсан",
                dataIndex: "opened_at",
                render: (value: any) => {
                  if (!value) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Суларсан",
                dataIndex: "freed_at",
                render: (value: any) => {
                  if (!value) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Талбайгаас явсан",
                dataIndex: "left_site_at",
                render: (value: any) => {
                  if (!value) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Буцаж ирсэн",
                dataIndex: "returned_at",
                render: (value: any) => {
                  if (!value) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
            ],
          },
          {
            title: "Хоног",
            dataIndex: "id",
            children: [
              {
                title: "Талбайд ирсэнээс хойш",
                dataIndex: "arrival_field",
                render: (_, record) => {

                  return dayjs(record?.opened_at).diff(
                    dayjs(record?.arrived_at_site),
                    "days"
                  );
                },
              },
              {
                title: "Задарснаас хойш суларсан",
                dataIndex: "cleaned_watered",
                render: (_, record) => {

                  return dayjs(record?.freed_at).diff(
                    dayjs(record?.opened_at),
                    "days"
                  );
                },
              },
              {
                title: "Задарснаас хойш талбайгаас явсан",
                dataIndex: "cleaned_field",
                render: (_, record) => {

                  return dayjs(record?.left_site_at).diff(
                    dayjs(record?.opened_at),
                    "days"
                  );
                },
              },
              {
                title: "Суларсанаас хойш ачилт хийсэн",
                dataIndex: "watered_worked",
                render: (_, record) => {
  
                  return dayjs(record?.returned_at).diff(
                    dayjs(record?.freed_at),
                    "days"
                  );
                },
              },
              {
                title: "Буцаж ирсэнээс хойш ачилт хийсэн",
                dataIndex: "returned_worked",
                render: (_, record) => {
                  if (!record.returned_at || !record.freed_at) {
                    return "-";
                  }

                  return dayjs(record?.returned_at).diff(
                    dayjs(record?.left_site_at),
                    "days"
                  );
                },
              },
            ],
          },
        ]}
      />
    </PageCard>
  );
};

export default myFill;
