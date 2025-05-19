import { UserRoleType } from "config";
import { FC } from "react";

interface Props {
  status?: string;
}

const UserBadge: FC<Props> = ({ status }) => {
  let text = "Тээврийн менежер";
  let colorClass = "bg-[#FFFAEB] text-[#B54708]";
  switch (status) {
    case UserRoleType.financier:
      text = "Санхүүч";
      colorClass = "bg-green-50 text-green-700";
      break;
    case UserRoleType.cashier:
      text = "Кассир";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    case UserRoleType.admin:
      text = "Админ";
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
      break;
    case UserRoleType.customer:
      text = "Харилцагч";
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
      break;
    default:
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
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

export default UserBadge;
