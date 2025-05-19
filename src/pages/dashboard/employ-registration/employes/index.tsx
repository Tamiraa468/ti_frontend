import { useDebounceFn, useRequest } from "ahooks";
import { notification, Tooltip } from "antd";
import UserBadge from "components/badge/userbadge";
import { PageCard } from "components/card";
import { Label } from "components/label";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { GenderType } from "config";
import { useEffect, useState } from "react";
import { Admin } from "service/auth/type";
import employRegistration from "service/employ-registration";
import { Key01 } from "untitledui-js-base";
import { EmployePagination } from "utils/index";
import { UpdatePass } from "../update-pass";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const Workers = () => {
  const [filter, setFilter] = useState(EmployePagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [changePass, setChangePass] = useState<Admin>();
  const list = useRequest(employRegistration.list, {
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
          customHeaderTitle={<Label title="Ажилчдын жагсаалт" />}
          fileName="Ажилчдын жагсаалт"
          searchPlaceHolder="Овог, нэр , утасны дугаар "
          setCreate={setCreate}
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<Admin>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        UpdateComponent={UpdateService}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "last_name",
            title: "Овог",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.last_name || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "first_name",
            title: "Нэр",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "gender",
            title: "Хүйс",
            align: "center",
            render: (value ) => (
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
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "phone",
            title: "Утасны дугаар",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "role_name",
            title: "Албан тушаал",
            render: (value) => {
              return value ? <UserBadge status={value.toString()} /> : "-";
            },
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
        RemoveModelConfig={{
          action: employRegistration.deleteEmploy,
          config: (record) => ({
            uniqueKey: record?._id,
            display: record?.first_name,
            title: "Remove",
          }),
        }}
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

export default Workers;
