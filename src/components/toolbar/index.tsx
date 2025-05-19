import { Button } from "antd";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

export const Toolbar = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        className="flex items-center text-md font-semibold"
        icon={<AiOutlineCloudDownload size={20} />}
      >
        <span className="ml-2"> Export</span>
      </Button>
      <Button
        type="primary"
        className="flex items-center text-md font-semibold"
        icon={
          <IoCreateOutline
            size={20}
            style={{
              transform: "rotate(180deg)",
            }}
          />
        }
      >
        <span className="ml-2"> Create</span>
      </Button>
    </div>
  );
};
