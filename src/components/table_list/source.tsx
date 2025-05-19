type Props<T> = {
  data: T;
  columns?: {
    dataIndex?: string;
    className?: string;
    fixed?: boolean;
    right?: boolean;
    render?: (value: any, record: T, index: number) => any;
  }[];
};

export const ITableSource = <T,>({ data, columns }: Props<T>) => {
  return (
    <>
      {columns?.map((col, key) => {
        const value = col?.dataIndex
          ? (data as any)?.[col?.dataIndex as any]
          : "";
        return (
          <div
            key={key}
            className={`${
              col.right &&
              "flex items-center justify-start w-full lg:w-fit lg:flex-1  lg:justify-end "
            } ${col.className}`}
          >
            {col?.render ? col?.render(value, data, key) : value}
          </div>
        );
      })}
    </>
  );
};
