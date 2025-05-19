import { useDebounceFn, useRequest } from "ahooks";
import { notification, Switch } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import { Label } from "components/label";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { initPagination } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const CustomerCompany = () => {
  const [filter, setFilter] = useState(initPagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(customerCompany.list, {
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
          addButtonName="Нэмэх"
          customHeaderTitle={<Label title="Харилцагч компанийн жагсаалт" />}
          searchPlaceHolder="Нэр, данс"
          fileName="Харилцагч компанийн жагсаалт"
          setCreate={setCreate}
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<CustomerCompanyType>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        UpdateComponent={UpdateService}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "shortcut_name",
            title: "Товчлол",
            align: "left",
            render: (value) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "name",
            title: "Компаний нэр",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "is_broker",
            title: "Зууч эсэх",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {<Switch disabled checked={!!value} />}
              </span>
            ),
          },
          {
            dataIndex: "ledger_name",
            title: "Харилцагчийн код",
            width: "200",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {record?.ledger?.name || "-"}
              </span>
            ),
          },
          {
            dataIndex: "contact_number",
            title: "Харилцах дугаар",
            align: "center",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "email",
            title: "Цахим хаяг",
            align: "left",
            width: "10%",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {record?.user?.email || "-"}
              </span>
            ),
          },
          {
            dataIndex: "created_by",
            title: "Бүртгэсэн ажилтан",
            align: "left",
            width: "10%",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {record?.created_by?.email || "-"}
              </span>
            ),
          },
        ]}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
        // RemoveModelConfig={{
        //   action: customerCompany.deleteA,
        //   config: (record) => ({
        //     uniqueKey: record?.id,
        //     display: record?.name,
        //     title: "Remove",
        //   }),
        // }}
      />
    </PageCard>
  );
};

export default CustomerCompany;
