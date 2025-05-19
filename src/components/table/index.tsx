import ProTable, {
  ActionType,
  ProColumns,
  ProTableProps,
} from "@ant-design/pro-table";
import { RemoveModal } from "components/modal";
import React, { useRef, useState } from "react";
import { ActionComponentProps, RemoveModelConfig } from "types";
import { DeleteButton, DetailButton, EditButton, StopPagination } from "..";

type Props<T> = ProTableProps<T, any, any> & {
  CreateComponent?: React.FC<ActionComponentProps<T>>;
  DetailComponent?: React.FC<ActionComponentProps<T>>;
  UpdateComponent?: React.FC<ActionComponentProps<T>>;
  RemoveComponent?: React.FC<ActionComponentProps<T>>;
  columns?: ProColumns<T, any>[];
  hideAction?: boolean;
  total?: number;
  refresh?: (value?: any) => void;
  details?: T[];
  create?: boolean;
  customActions?: (value: T) => React.ReactNode;
  RemoveModelConfig?: RemoveModelConfig<T>;
  onPaginationChange?: (page: number, pageSize: number) => void;
  hideEditButton?: (record: any) => boolean;
  hideInActiveButton?: (record: any) => boolean;
  showDetailButton?: (record: any) => boolean;
  noShadow?: boolean;
  selectedId?: number;
  page?: number;
  form?: any;
  setForm?: any;
  limit?: number;
  setCreate?: Function;
  scroll?: any;
  actionWidth?: number | string;
  hidePagination?: boolean;
  rowKey?: string;
  hideCounter?: boolean;
};

export const ITable = <T extends {}>({
  CreateComponent,
  UpdateComponent,
  DetailComponent,
  RemoveComponent,
  hidePagination,
  create,
  setCreate,
  columns,
  hideAction = false,
  total,
  refresh,
  setForm,
  details,
  customActions,
  scroll,
  form,
  RemoveModelConfig,
  onPaginationChange,
  hideEditButton,
  showDetailButton,
  noShadow = false,
  page,
  limit,
  hideCounter = false,
  actionWidth,
  rowKey,
  ...rest
}: Props<T>) => {
  const [pageData, setPageData] = useState<{ page: number; pageSize: number }>({
    page: 0,
    pageSize: limit ?? 20,
  });
  const actionRef = useRef<ActionType>();
  const [update, setUpdate] = useState<T>();
  const [detail, setDetail] = useState<T>();
  const [remove, setRemove] = useState<T>();

  return (
    <>
      <ProTable
        className="p-0 m-0 remove-padding-table "
        id="main-table"
        {...rest}
        actionRef={actionRef}
        options={{
          reload: false,
          setting: false,
          density: false,
        }}
        rowKey={rowKey ? rowKey : `id`}
        scroll={scroll ?? { x: "max-content" }}
        size="small"
        search={false}
        style={{ borderRadius: 0 }}
        pagination={
          !hidePagination && {
            className: "px-6 font-semibold text-gray-500 flex items-center",
            pageSize: form?.pageSize,
            pageSizeOptions: [20, 50, 100, 200, 500, 1000, 1500],
            showSizeChanger: true,
            onChange: (page, size) => {
              const current = page - 1;
              setForm?.({
                ...form,
                current: current,
                pageSize: size,
              });
              setPageData({ page: current, pageSize: size });
              !form &&
                refresh?.({
                  ...form,
                  current: form ? (form.current ? form.current : 0) : page,
                  pageSize: form?.pageSize || size,
                });
            },
            showTotal: (total, range) => {
              return (
                <div className="font-semibold text-gray-500">
                  {range[0]}-{range[1]} of {total} items
                </div>
              );
            },
            total,
            showLessItems: true,
            onShowSizeChange: (page, pageSize) => {
              const current = page - 1;
              setForm?.({ current: current, pageSize: pageSize });
              setPageData({ page: current, pageSize });
              !form &&
                refresh?.({
                  ...form,
                  current: form ? (form.current ? current : 0) : current,
                  pageSize: form?.pageSize || pageSize,
                });
            },
            responsive: true,
          }
        }
        columns={[
          {
            title: "№",
            align: "center",
            width: 50,
            hideInTable: hideCounter,
            fixed: "left",
            dataIndex: "index",
            valueType: "index",
            className: "text-gray-600",
            render: (_value, _record, index) =>
              (form?.current || 1) * (form?.pageSize || 1) +
              (index + 1) -
              (form?.pageSize || 1),
          },
          ...(columns as any),
          {
            hideInTable: hideAction,
            title: "",
            fixed: "right",
            dataIndex: "action",
            align: "right",
            width: "auto",
            render: (_, record) => {
              return (
                <StopPagination>
                  <div className="gap-2 flex items-center justify-end mr-3">
                    {DetailComponent && (
                      <DetailButton
                        style={{
                          opacity: showDetailButton?.(record) ? 0.5 : 1,
                          cursor: showDetailButton?.(record)
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onClick={() => {
                          showDetailButton?.(record) ? null : setDetail(record);
                        }}
                      />
                    )}
                    {UpdateComponent && (
                      <EditButton
                        style={{
                          opacity: hideEditButton?.(record) ? 0.5 : 1,
                          cursor: hideEditButton?.(record)
                            ? "not-allowed"
                            : "pointer",
                        }}
                        onClick={() => {
                          hideEditButton?.(record) ? null : setUpdate(record);
                        }}
                      />
                    )}
                    {(RemoveModelConfig || RemoveComponent) && (
                      <DeleteButton
                        onClick={() => {
                          setRemove(record);
                        }}
                      />
                    )}
                    {customActions && customActions(record)}
                  </div>
                </StopPagination>
              );
            },
          },
        ]}
      />

      {CreateComponent && (
        <CreateComponent
          open={create || false}
          onCancel={() => setCreate?.(false)}
          onFinish={() => {
            setCreate?.(false);
            refresh?.({
              ...form,
              current: form ? (form.current ? form.current : 0) : pageData.page,
              pageSize: form?.pageSize || pageData.pageSize,
            });
          }}
          details={details}
        />
      )}
      {UpdateComponent && (
        <UpdateComponent
          open={!!update}
          onCancel={() => setUpdate(undefined)}
          detail={update}
          onFinish={() => {
            setUpdate(undefined);
            refresh?.({
              ...form,
              current: form ? (form.current ? form.current : 0) : pageData.page,
              pageSize: form?.pageSize || pageData.pageSize,
            });
          }}
          details={details}
        />
      )}
      {DetailComponent && (
        <DetailComponent
          open={!!detail}
          detail={detail}
          onCancel={() => setDetail(undefined)}
          details={details}
        />
      )}
      {RemoveComponent && (
        <RemoveComponent
          open={!!remove}
          onCancel={() => setRemove(undefined)}
          detail={remove}
          onFinish={() => {
            setRemove(undefined);
            refresh?.({
              ...form,
              current: form ? (form.current ? form.current : 0) : pageData.page,
              pageSize: form?.pageSize || pageData.pageSize,
            });
          }}
          details={details}
        />
      )}
      {RemoveModelConfig && (
        <RemoveModal
          {...RemoveModelConfig.config(remove as any)}
          open={!!remove}
          onDone={() => {
            refresh?.({
              ...form,
              current: form ? (form.current ? form.current : 0) : pageData.page,
              pageSize: form?.pageSize || pageData.pageSize,
            });
            setRemove(undefined);
          }}
          onCancel={() => setRemove(undefined)}
          onRequest={RemoveModelConfig.action}
          remove={true}
        />
      )}
    </>
  );
};
