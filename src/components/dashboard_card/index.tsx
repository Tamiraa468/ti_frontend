import { Card, Tag } from "antd";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { formatNumber, moneyFormat } from "utils/index";
export type CardProps = {
  label: string;
  description: string;
  amount?: number;
  percent?: number;
  isMoney?: boolean;
  loading?: boolean;
  customItem?: React.ReactNode;
};
const DashboardCard = ({
  label,
  amount,
  percent,
  isMoney = false,
  loading = false,
  customItem,
  description,
}: CardProps) => {
  return (
    <Card
      headStyle={{
        display: "none",
      }}
      className=" w-full border border-gray-200"
      loading={loading}
    >
      <div className="space-y-12">
        <div className="flex flex-col mb-2">
          <span className="text-gray-900 text-base font-semibold mb-1">
            {description}{" "}
          </span>
          <span className="text-[#475467] text-sm font-normal mb-2">
            {label}{" "}
          </span>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="text-[#0077F4] text-4xl font-bold -tracking-tight">
            {moneyFormat(amount)} {isMoney && "₮"}
          </div>
          {percent ? (
            <Tag
              bordered={false}
              color={percent > 0 ? "#ECFDF3" : "error"}
              className="rounded-full flex items-center text-base h-fit"
            >
              {percent > 0 ? (
                <BsArrowUpShort fontWeight={500} size={15} color="#027a48" />
              ) : (
                <BsArrowDownShort fontWeight={500} size={15} />
              )}
              <span
                className={`font-medium ${
                  percent > 0 ? "text-[#027a48]" : "text-red-500"
                }`}
              >
                {" "}
                {percent > 0
                  ? formatNumber(percent)
                  : formatNumber(percent * -1)}
                %
              </span>
            </Tag>
          ) : null}

          {customItem}
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
