import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification, Select, Tooltip } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { CreateButton, ITable } from "components/index";
import { Label } from "components/label";
import { InvalidateModal } from "components/modal/invalidate_ticket";
import PublicDetail from "components/public-view";
import InitTableHeader from "components/table-header";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { CargoApproachList } from "service/feild_registration/type";
import { FileX02, FileX03 } from "untitledui-js-base";
import { fieldRegistrationPaginate, moneyFormat } from "utils/index";
import {
  ArrilvelFieldPaymentMethod,
  CapacityOptions,
  DirectionOptions,
  DirectionSelect,
} from "utils/options";
import { AssignationCreate } from "./assignation_create";
import { CreateCargoApproach } from "./create_cargo_approach";
import { ShippmentCreate } from "./shippment_create";

export const ArrivalField: React.FC = () => {
  const [user] = useContext(AuthContext);
  const [filter, setFilter] = useState(fieldRegistrationPaginate);
  const [ticketInvalidate, setTicketInvalidate] = useState<number | undefined>(
    undefined,
  );
  const [search, setSearch] = useState<string>("");
  const [record, setRecord] = useState<CargoApproachList>();
  const [assignationCreate, setAssignationCreate] = useState(false);
  const [shippmentCreate, setShippmentCreate] = useState(false);
  const [createCargoApproach, setCreateCargoApproach] = useState(false);

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
    });
  }, [filter]);

  const refreshList = () => {
    fieldRegister?.run({
      ...filter,
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
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, search: e });
        }}
        refresh={refreshList}
        hideCreate={user?.user?.role_name !== UserRoleType.cashier}
        setCreate={setCreateCargoApproach}
        fileName="ArrivalField"
        customAction={
          user?.user?.role_name === UserRoleType.cashier && (
            <div className="flex items-center gap-3">
              <CreateButton
                disabled={
                  !record ||
                  record?.shipping_status?.is_shipping_additional_fee_paid
                }
                size="large"
                type="default"
                className="text-[#007AFF]"
                onClick={() => {
                  setAssignationCreate(true);
                }}
                addButtonName="Олголт"
              />
              <CreateButton
                disabled={
                  !record ||
                  !record?.assignation_status
                    ?.is_assignation_additional_fee_paid ||
                  record?.shipping_status?.is_shipping_additional_fee_paid
                }
                size="large"
                type="default"
                className="text-[#34C759]"
                onClick={() => {
                  setShippmentCreate(true);
                }}
                addButtonName="Ачилт"
              />
            </div>
          )
        }
        filter={
          <Select
            className="w-48"
            size="large"
            defaultValue={null}
            onChange={(e) => {
              setFilter({
                ...filter,
                direction: e,
              });
            }}
            options={DirectionSelect.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
        }
      />
      <ITable<CargoApproachList>
        dataSource={fieldRegister.data?.items}
        bordered
        loading={fieldRegister.loading}
        rowSelection={
          user?.user?.role_name === UserRoleType.cashier && {
            type: "radio",
            onChange: (_, selectedRows) => {
              setRecord(selectedRows[0]);
            },
          }
        }
        DetailComponent={PublicDetail}
        refresh={refreshList}
        CreateComponent={CreateCargoApproach}
        create={createCargoApproach}
        setCreate={setCreateCargoApproach}
        className="p-0 remove-padding-table"
        tableAlertRender={false}
        customActions={(record) => {
          if (user?.user?.role_name !== UserRoleType.cashier) return null;
          return (
            <div className="flex items-center gap-1">
              {record?.assignation_status
                ?.is_assignation_additional_fee_paid && (
                  <Tooltip title="Олголтын элдэв хураамж цуцлах">
                    <FileX03
                      className="w-5 p-2 text-red-700"
                      onClick={() => {
                        setTicketInvalidate(record?.assignment_ticket_id);
                      }}
                    />
                  </Tooltip>
                )}
              {record?.assignation_status?.is_assignation_additional_fee_paid &&
                record?.shipping_status?.is_shipping_additional_fee_paid && (
                  <Tooltip title="Ачилтын элдэв хураамж цуцлах">
                    <FileX02
                      className="w-5 p-2 text-red-700"
                      onClick={() => {
                        setTicketInvalidate(record?.shipping_ticket_id);
                      }}
                    />
                  </Tooltip>
                )}
            </div>
          );
        }}
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
                    (item) => item.value === record?.direction,
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
                        (capacity) => capacity.value === value,
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
                      item.value === record?.transport_recieve?.payment_method,
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
                render: (_, record: any) => {
                  if (!record.arrived_at_site) {
                    return "-";
                  }
                  return dayjs(record.arrived_at_site).format("YYYY-MM-DD");
                },
              },
              {
                title: "Талбайд задарсан",
                dataIndex: "opened_at",
                render: (_, record: any) => {
                  if (!record.opened_at) {
                    return "-";
                  }
                  return dayjs(record.opened_at).format("YYYY-MM-DD");
                },
              },
              {
                title: "Суларсан",
                dataIndex: "freed_at",
                render: (_, record: any) => {
                  if (!record.freed_at) {
                    return "-";
                  }
                  return dayjs(record.freed_at).format("YYYY-MM-DD");
                },
              },
              {
                title: "Талбайгаас явсан",
                dataIndex: "left_site_at",
                render: (_, record: any) => {
                  if (!record.left_site_at) {
                    return "-";
                  }
                  return dayjs(record.left_site_at).format("YYYY-MM-DD");
                },
              },
              {
                title: "Буцаж ирсэн",
                dataIndex: "returned_at",
                render: (_, record: any) => {
                  if (!record.returned_at) {
                    return "-";
                  }
                  return dayjs(record.returned_at).format("YYYY-MM-DD");
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
                  if (!record?.arrived_at_site || !record?.opened_at) {
                    return "-";
                  }
                  return dayjs(record?.opened_at).diff(
                    dayjs(record?.arrived_at_site),
                    "days",
                  );
                },
              },
              {
                title: "Задарснаас хойш суларсан",
                dataIndex: "cleaned_watered",
                render: (_, record) => {
                  if (!record?.opened_at || !record?.freed_at) {
                    return "-";
                  }
                  return dayjs(record?.freed_at).diff(
                    dayjs(record?.opened_at),
                    "days",
                  );
                },
              },
              {
                title: "Задарснаас хойш талбайгаас явсан",
                dataIndex: "cleaned_field",
                render: (_, record) => {
                  if (!record?.left_site_at || !record?.opened_at) {
                    return "-";
                  }
                  return dayjs(record?.left_site_at)?.diff(
                    dayjs(record?.opened_at),
                    "days",
                  );
                },
              },
              {
                title: "Суларсанаас хойш ачилт хийсэн",
                dataIndex: "watered_worked",
                render: (_, record) => {
                  if (!record?.freed_at || !record?.returned_at) {
                    return "-";
                  }
                  return dayjs(record?.returned_at).diff(
                    dayjs(record?.freed_at),
                    "days",
                  );
                },
              },
              {
                title: "Буцаж ирсэнээс хойш ачилт хийсэн",
                dataIndex: "returned_worked",
                render: (_, record) => {
                  if (!record?.left_site_at || !record?.returned_at) {
                    return "-";
                  }
                  return dayjs(record?.returned_at).diff(
                    dayjs(record?.left_site_at),
                    "days",
                  );
                },
              },
            ],
          },
        ]}
      />
      {assignationCreate && (
        <AssignationCreate
          open={assignationCreate}
          onCancel={() => {
            setAssignationCreate(false);
          }}
          onFinish={() => {
            setRecord(undefined);
            setAssignationCreate(false);
            refreshList();
          }}
          detail={record}
        />
      )}

      {shippmentCreate && (
        <ShippmentCreate
          open={shippmentCreate}
          onCancel={() => {
            setShippmentCreate(false);
          }}
          onFinish={() => {
            setRecord(undefined);
            setShippmentCreate(false);
            refreshList();
          }}
          detail={record}
        />
      )}
      {ticketInvalidate && (
        <InvalidateModal
          title="Элдэв хураамжийн цуцлах хүсэлт"
          remove
          onCancel={() => setTicketInvalidate(undefined)}
          onDone={() => {
            refreshList();
            setTicketInvalidate(undefined);
          }}
          open={!!ticketInvalidate}
          ticket_id={ticketInvalidate}
        />
      )}
    </PageCard>
  );
};
