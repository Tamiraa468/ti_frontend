import { ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { transictionTypeEnum, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import transaction from "service/fininaciar/accountSettlement/transaction";
import { moneyFormat, transictionFilter } from "utils/index";
import { PaymentMethod } from "utils/options";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const Transaction = () => {
  const [filter, setFilter] = useState(transictionFilter);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState<boolean>(false);
  const [user] = useContext(AuthContext);
  const list = useRequest(transaction.customerPaymentlist, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...filter,
      search: search,
      created_by: user?.user?.id,
    });
  };

  useEffect(() => {
    run();
  }, [filter]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <PageCard xR>
      <div className="px-2 pb-0">
        <InitTableHeader
          hideTitle
          leftContent={
            <div className="flex gap-3 items-end">
              <DatePicker.RangePicker
                className="w-max"
                placeholder={["Эхлэх огноо", "Дуусах огноо"]}
                onChange={(values) => {
                  setFilter({
                    ...filter,
                    between: [
                      dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD") ?? "",
                      dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD") ?? "",
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
          filter={
            <ProFormSelect
              placeholder={"Сонгох"}
              fieldProps={{
                size: "large",
                allowClear: true,
                className: "select-focus",
                style: { width: 200 },
                onChange: (e) => {
                  setFilter({ ...filter, transaction_type: e as any });
                },
              }}
              options={[
                {
                  label: "Бүх",
                  value: "",
                },
                {
                  label: "Орлого",
                  value: transictionTypeEnum.debit,
                },
                {
                  label: "Зарлага",
                  value: transictionTypeEnum.credit,
                },
              ]}
            />
          }
          setCreate={setCreate}
          searchPlaceHolder="Данс , Харилцагчийн нэр , Мөнгөн дүн"
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          fileName="Харилцагчийн дансны гүйлгээний жагсаалт"
          refresh={() => list.run({ ...filter, search: search })}
          hideCreate={user?.user?.role_name !== UserRoleType.financier}
        />
      </div>

      <ITable<any>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list.data?.items ?? []}
        refresh={(values) =>
          list.run({ ...filter, created_by: user?.user?.id, ...values })
        }
        form={filter}
        UpdateComponent={
          user?.user?.role_name === UserRoleType.financier
            ? UpdateService
            : undefined
        }
        setForm={setFilter}
        columns={[
          {
            dataIndex: "created_at",
            title: "Огноо",
            align: "left",
            render: (value: any) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {dayjs(value).format("YYYY-MM-DD") || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "initial_balance",
            title: "Харилцагчийн нэр ",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.ledger?.customer_company?.name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "ledger",
            title: "Данс",
            align: "left",
            render: (value: any) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value?.name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "payment_type",
            title: "Төлөлтийн хэлбэр",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {PaymentMethod.find((item) => item.value === value)?.label ||
                  "-"}
              </span>
            ),
          },
          {
            dataIndex: "transaction_type",
            title: "Гүйлгээний төрөл",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value === transictionTypeEnum.debit ? "Орлого" : "Зарлага"}
              </span>
            ),
          },
          {
            title: "Мөнгөн дүн",
            dataIndex: "amount",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(value) || "-"}
              </span>
            ),
          },
          {
            title: "Дансны үлдэгдэл",
            dataIndex: "amount",
            render: (_: any, record: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.ledger_amount) || "-"}
              </span>
            ),
          },
          {
            dataIndex: "barimt",
            title: "Баримт",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "payer",
            title: "Төлөгч",
            align: "center",
            render: (value: any, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {record?.ledger?.customer_company?.shortcut_name || "-"}
              </span>
            ),
          },
        ]}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
      />
    </PageCard>
  );
};

export default Transaction;
