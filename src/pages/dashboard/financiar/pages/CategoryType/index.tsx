import { useDebounceFn, useRequest } from "ahooks";
import { PageCard } from "components/card";
import { Label } from "components/label";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { CategoryTypeEnum } from "config";
import { useEffect, useState } from "react";
import categoryType from "service/fininaciar/categoryType";
import { CategoryTypeTypes } from "service/fininaciar/categoryType/type";
import { initPagination } from "utils/index";
import { CreateService } from "./actions/create";
import { UpdateService } from "./actions/update";

const CategoryType = () => {
  const [filter, setFilter] = useState(initPagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(categoryType.list, {
    manual: true,
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
          customHeaderTitle={<Label title="Элдэв хураамжийн ангилал" />}
          fileName="Элдэв хураамжийн ангилал"
          searchPlaceHolder="Нэр"
          setCreate={setCreate}
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<CategoryTypeTypes>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        UpdateComponent={UpdateService}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: "code",
            title: "Ангилал код",
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
            title: "Нэр",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "category_type",
            title: "Ангилал",
            width: "200",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value === CategoryTypeEnum.assignation ? "Олголт" : "Ачилт"}
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
        RemoveModelConfig={{
          action: categoryType.deleteA,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.name,
            title: "Remove",
          }),
        }}
      />
    </PageCard>
  );
};

export default CategoryType;
