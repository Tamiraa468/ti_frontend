import { useDebounceFn, useRequest } from "ahooks";
import { notification, Switch, Tooltip } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import { Label } from "components/label";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { Key01 } from "untitledui-js-base";
import { initPagination } from "utils/index";
import { UpdatePass } from "../update-pass";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const CustomerCompany = () => {
  const [filter, setFilter] = useState(initPagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [changePass, setChangePass] = useState<CustomerCompanyType>();

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
        ]}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
        customActions={(record) => {
          return (
            <Tooltip title="Нууц үг солих">
              <Key01
                className="w-5 p-2 text-red-700"
                onClick={() => {
                  setChangePass(record);
                }}
              />
            </Tooltip>
          );
        }}
        // RemoveModelConfig={{
        //   action: customerCompany.deleteA,
        //   config: (record) => ({
        //     uniqueKey: record?.id,
        //     display: record?.name,
        //     title: "Remove",
        //   }),
        // }}
      />

      {changePass && (
        <UpdatePass
          open={!!changePass}
          onCancel={() => setChangePass(undefined)}
          onFinish={() => {
            run();
            setChangePass(undefined);
          }}
          detail={changePass}
        />
      )}
    </PageCard>
  );
};

export default CustomerCompany;
