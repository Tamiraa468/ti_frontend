import { EditOutlined } from "@ant-design/icons";
import { Card, Empty, Pagination } from "antd";
import { RemoveModal } from "components/modal";
import { useEffect, useState } from "react";
import { ActionComponentProps, RemoveModelConfig } from "types";
import { DeleteButton, EditButton, IfCondition } from "..";
import { ITableListLoader } from "./loading";
import { ITableSource } from "./source";

type Props<T> = {
  total?: number;
  dataSource?: T[];
  columns?: {
    dataIndex?: string;
    className?: string;
    fixed?: boolean;
    right?: boolean;
    render?: (value: any, record: T, index: number) => any;
  }[];
  gap?: number;
  itemClassName?: string;
  seperate?: boolean;
  UpdateComponent?: React.FC<ActionComponentProps<T>>;
  RemoveConfig?: RemoveModelConfig<T>;
  refresh?: (values?: any) => void;
  loading?: boolean;
  pagination?: boolean;
  wrapperClassName?: string;
  onClick?: (record: T) => void;
};

const borderClass =
  "border-t border-l-0 border-r-0 border-b-0 border-solid border-gray-200";
const borderBottomClass =
  "border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-200";

export const ITableList = <T,>({
  dataSource,
  total,
  columns,
  gap,
  itemClassName = "px-4 py-[23px]",
  seperate,
  refresh,
  UpdateComponent,
  RemoveConfig,
  loading,
  pagination: hidePagination,
  wrapperClassName,
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState<T>();
  const [detail, setDetail] = useState<T>();
  const [remove, setRemove] = useState<T>();

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const isRightColumn = columns?.some((col) => col.right);

  useEffect(() => {
    setIsLoading(true);
    if (!loading)
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
  }, [loading]);

  return (
    <>
      <div className="relative">
        <div className={` ${borderClass}`}>
          <IfCondition
            condition={isLoading}
            whenTrue={<ITableListLoader />}
            whenFalse={
              <>
                {dataSource?.length === 0 && (
                  <Card bordered={false}>
                    <Empty />
                  </Card>
                )}

                {dataSource?.map((el, key) => {
                  return (
                    <div
                      key={key}
                      className={` flex items-center flex-wrap xl:flex-nowrap  gap-4 ${
                        !seperate && borderBottomClass
                      } ${
                        seperate
                          ? `my-2 rounded-xl bg-white transition-all ${wrapperClassName}`
                          : "py-4 px-4"
                      }`}
                    >
                      <div
                        className={`flex items-center flex-wrap w-full gap-${gap} ${itemClassName}`}
                      >
                        <ITableSource<T> data={el} columns={columns} />
                      </div>
                      {(UpdateComponent || RemoveConfig) && (
                        <div
                          className={` flex items-center justify-end gap-2    ${
                            !isRightColumn && "xl:flex-1"
                          }`}
                        >
                          {UpdateComponent && (
                            <EditButton
                              type="primary"
                              title={"Засах"}
                              onClick={() => setUpdate(el)}
                              icon={<EditOutlined rev={undefined} />}
                            />
                          )}
                          {RemoveConfig && (
                            <DeleteButton
                              title="Устгах"
                              onClick={() => setRemove(el)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            }
          />
        </div>

        <Pagination
          onChange={(page, pageSize) => {
            setPagination({
              ...pagination,
              current: page ? page : 1,
              pageSize,
            });
            refresh?.({ current: page, pageSize });
          }}
          current={pagination.current}
          total={total}
          showTotal={(total, range) => (
            <div className="font-semibold text-gray-500">
              {range[0]}-{range[1]} of {total} items
            </div>
          )}
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 50, 100, 200, 500]}
          responsive
          className={`flex justify-end pt-4 ${hidePagination && "hidden"}`}
          size="small"
        />
      </div>

      {UpdateComponent && (
        <UpdateComponent
          open={!!update}
          onCancel={() => setUpdate(undefined)}
          detail={update}
          onFinish={() => {
            setUpdate(undefined);
            refresh?.({ ...pagination, page: pagination.current - 1 });
          }}
        />
      )}
      {/* {DetailComponent && (
    <DetailComponent
      open={!!detail}
      detail={detail}
      onCancel={() => setDetail(undefined)}
      details={details}
    />
  )} */}

      {RemoveConfig && (
        <RemoveModal
          {...RemoveConfig.config(remove as any)}
          open={!!remove}
          onDone={() => {
            refresh?.({ ...pagination, page: pagination.current - 1 });
            setRemove(undefined);
          }}
          onCancel={() => setRemove(undefined)}
          onRequest={RemoveConfig.action}
          remove={true}
        />
      )}
    </>
  );
};
