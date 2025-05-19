import { Tag } from "antd";
import Badge from "components/badge";
import dayjs from "dayjs";

type PropsOrder = {
  status?: string;
};
let globalClass = "border-0 font-medium ";
export const RenderOrderStatus = ({ status }: PropsOrder) => {
  let className = globalClass;
  switch (status) {
    case "pending":
      className += "text-warning-700 bg-warning-50 capitalize";
      break;
    case "confirm":
      className += "text-success-700  bg-success-50 capitalize";
      break;
    default:
      break;
  }
  return <Tag className={className}>{status}</Tag>;
};

export const RenderDateStatus = ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const isActive = dayjs(endDate).isAfter(startDate);
  return (
    <Badge
      title={isActive ? "Active" : "Ended"}
      color={isActive ? "green" : "gray"}
    />
  );
};
