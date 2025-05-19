import { FC } from "react";

interface Props {
  status?: any | React.ReactNode;
}

export const BooleanBadge: FC<Props> = ({ status }) => {
  let text = "None";
  let colorClass = "bg-[#F2F4F7] text-[#344054]";
  switch (status) {
    case true:
      text = "Тийм";
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
      break;
    case false:
      text = "Үгүй";
      colorClass = "bg-[#ECFDF3] text-[#027A48]";
      break;
    default:
      colorClass = "bg-[#F2F4F7] text-[#344054]";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default BooleanBadge;
