import { Button } from "antd";
import Handbook from "assets/doc/handbook.pdf";
import { RiHome6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
export type Props = {
  title?: String;
  subTitle?: String;
};
export const PageHeader = ({ title, subTitle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathName: string[] = location.pathname
    .split("/")
    .filter((el) => el.length > 0)
    ?.slice(2, 3);
  const HeaderName = (pathName: string[]) => {
    let result = "";
    switch (pathName[0]) {
      case "requests":
        result = "Хүсэлт";
        break;
      case "report":
        result = "Тайлан";
        break;
      case "caregiver":
        result = "Үйлчлүүлэгч";
        break;
      case "orphan":
        result = "Асрамжийн газар";
        break;
      case "settings":
        result = "Тохиргоо";
        break;
      case "feedback":
        result = "Санал, хүсэлт";
        break;
      case "employees":
        result = "Ажилчдын жагсаалт";
        break;
      default:
        break;
    }
    return result;
  };

  return (
    <div className=" flex items-center justify-between mb-4">
      <div className="flex items-center gap-4 ">
        <RiHome6Line
          size={20}
          color="#667085"
          className="cursor-pointer"
          onClick={() => navigate("dashboard/screening-list")}
        />

        <div className="text-lg text-gray-300">/</div>

        <div className="flex items-center gap-2 ">
          {pathName.map((index) => {
            return (
              <div className="flex items-center gap-2" key={index}>
                <p className="font-medium text-sm text-gray-700 capitalize">
                  {HeaderName(pathName)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Button type="primary" className=" " href={Handbook} target="_blank">
        Гарын авлага татах
      </Button>
    </div>
  );
};
