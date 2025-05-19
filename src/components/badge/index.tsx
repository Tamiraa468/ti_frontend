import { FC } from "react";

interface Props {
  title?: React.ReactNode | String | number;
  color?:
    | "gray"
    | "green"
    | "red"
    | "yellow"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | string;
}

const IBadge: FC<Props> = ({ title, color }) => {
  let colorClass = "bg-gray-100 text-gray-700";
  switch (color) {
    case "gray":
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case "green":
      colorClass = "bg-green-100 text-green-700";
      break;
    case "red":
      colorClass = "bg-[#FEF3F2] text-[#B42318]";
      break;
    case "yellow":
      colorClass = "bg-yellow-100 text-yellow-700";
      break;
    case "blue":
      colorClass = "bg-blue-100 text-blue-700";
      break;
    case "indigo":
      colorClass = "bg-indigo-100 text-indigo-700";
      break;
    case "purple":
      colorClass = "bg-purple-100 text-purple-700";
      break;
    case "pink":
      colorClass = "bg-pink-100 text-pink-700";
      break;
    default:
      colorClass = "bg-white text-gray-700";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {title}
    </span>
  );
};

export default IBadge;
