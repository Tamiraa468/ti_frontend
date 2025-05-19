import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import ledger from "service/fininaciar/accountSettlement/ledger";
import { LedgerType } from "service/fininaciar/accountSettlement/ledger/type";
import { ledgerFilter, moneyFormat } from "utils/index";

const Ledger = () => {
  const [filter, setFilter] = useState(ledgerFilter);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(ledger.list, {
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
          hideCreate
          hideTitle
          leftContent={
            <div className="flex gap-2">
              {/* <DatePicker.RangePicker
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
              /> */}
            </div>
          }
          fileName="Харилцагчийн дансны жагсаалт"
          searchPlaceHolder="Үлдэгдэл, Дебит , Кредит"
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<LedgerType>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "initial_balance",
            title: "Товчлол",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.customer_company?.shortcut_name || "-"}
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
                  {record?.customer_company?.name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "initial_balance",
            title: "Данс",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.name || "-"}
                </span>
              </div>
            ),
          },
          // {
          //   dataIndex: "is_broker",
          //   title: "Эхний үлдэгдэл",
          //   width: "200",
          //   render: (_, record) => (
          //     <span className="text-sm text-[#475467] font-normal flex text-center">
          //       {moneyFormat(record?.initial_balance) || "-"}
          //     </span>
          //   ),
          // },
          {
            dataIndex: "contact_number",
            title: "Эцсийн үлдэгдэл",
            align: "center",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {moneyFormat(record?.balance) || "-"}
              </span>
            ),
          },
        ]}
      />
    </PageCard>
  );
};

export default Ledger;
