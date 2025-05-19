import { Tag } from "antd";

type PropsITag = {
  value?: string;
};
export const ITag = ({ value }: PropsITag) => {
  return (
    <Tag className="text-gray-700 bg-gray-100 border-none rounded-full font-medium text-xs px-2 py-1 capitalize ">
      {value}
    </Tag>
  );
};
