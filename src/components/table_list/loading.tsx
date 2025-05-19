import { Skeleton } from "antd";

export const ITableListLoader = () => {
  return (
    <div className="space-y-8  px-4 p-8 bg-white rounded-2xl">
      {new Array(10).fill(10).map((_, key) => (
        <div
          key={key}
          className="space-y-4 flex items-center gap-2  justify-between"
        >
          <div className=" flex items-center gap-2 ">
            <Skeleton.Avatar active className="m-0 p-0" size="large" />
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton.Input active size="small" className="m-0 p-0" />
              <Skeleton.Input active size="small" className="m-0 p-0" />
            </div>
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton.Input active size="small" className="m-0 p-0" />
              <Skeleton.Input active size="small" className="m-0 p-0" />
            </div>
            <div className="flex flex-col justify-center space-y-2">
              <Skeleton.Input active size="small" className="m-0 p-0" />
              <Skeleton.Input active size="small" className="m-0 p-0" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col justify-center gap-2">
              <Skeleton.Input active size="small" />
            </div>
            <Skeleton.Button active size="small" />
          </div>
        </div>
      ))}
    </div>
  );
};
