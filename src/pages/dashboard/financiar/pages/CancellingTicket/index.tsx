import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { DeleteButton, ITable } from "components/index";
import { Label } from "components/label";
import InitTableHeader from "components/table-header";
import { DetailTab } from "config";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import invalidatingAdditionalFee from "service/fininaciar/cancellingText";
import { InvalidateTicketList } from "service/fininaciar/cancellingText/type";
import { initPagination } from "utils/index";
import { InvalidateModal } from "./invalidate";

enum Status {
  created = "created",
  invalidated = "invalidated",
}

const CancellingTicket = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
  const [invalidateRecord, setInvalidateRecord] = useState<
    InvalidateTicketList | undefined
  >(undefined);

  const list = useRequest(invalidatingAdditionalFee.list, {
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
          hideTitle
          leftContent={
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold text-gray-700">
                <Label title={`Нийт (${list?.data?.total || 0})`} />
              </div>
            </div>
          }
          searchPlaceHolder="Чингэлэг дугаар"
          search={search}
          hideCreate
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<InvalidateTicketList>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        customActions={(record) => {
          return (
            record?.status === Status.created && (
              <DeleteButton
                onClick={() => {
                  setInvalidateRecord(record);
                }}
              />
            )
          );
        }}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            title: "Чингэлэг дугаар",
            dataIndex: "id",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.ticket?.container_transport_record?.container_code ||
                    "-"}
                </span>
              </div>
            ),
          },
          {
            title: "Төрөл",
            dataIndex: "type",
            align: "left",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {record?.ticket?.shipping_or_assignment === DetailTab.shipping
                  ? "Ачилт"
                  : "Олголт"}
              </span>
            ),
          },
          {
            title: "Хүсэлт явуулсан ажилтан",
            dataIndex: "request_cassir",
            width: "200",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {record?.created_by?.email || "-"}
              </span>
            ),
          },
          {
            title: "Төлөв",
            dataIndex: "status",
            width: "200",
            align: "center",
            render: (_, record) => {
              const title = record?.status || "-";
              if (title === Status.created) {
                return <IBadge color="green" title="Үүссэн" />;
              }
              return <IBadge color="red" title="Цуцлагдсан" />;
            },
          },
          {
            title: "Он сар өдөр",
            dataIndex: "created_at",
            width: "200",
            render: (value: any) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {dayjs(value).format("YYYY-MM-DD")}
              </span>
            ),
          },
        ]}
      />
      {invalidateRecord && (
        <InvalidateModal
          title="Элдэв хураамжын тасалбар цуцлах"
          open={!!invalidateRecord}
          onCancel={() => setInvalidateRecord(undefined)}
          onDone={() => {
            run();
            setInvalidateRecord(undefined);
          }}
          uniqueKey={invalidateRecord?.id}
        />
      )}
    </PageCard>
  );
};

export default CancellingTicket;
