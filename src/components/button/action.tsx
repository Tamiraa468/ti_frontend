import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Tooltip } from "antd";
import EditIcon from "assets/icons/edit-05.svg";
import { AiOutlineEye } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineCheckCircleOutline, MdOutlineClose } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { Edit04, MinusCircle } from "untitledui-js-base";

// type PropsCreate = ButtonProps;
interface PropsCreate extends ButtonProps {
  addButtonName?: string | React.ReactNode;
}

export const CreateButton = ({ addButtonName, ...rest }: PropsCreate) => {
  return (
    <Button
      {...rest}
      className={`flex items-center   font-medium gap-1 ${rest.className}`}
      icon={<IoAddOutline size={20} />}
      type={rest.type || "primary"}
    >
      {addButtonName || "Бүртгэх"}
    </Button>
  );
};

export const ApproveButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      className="flex items-center  font-medium gap-1"
      icon={<BiCheckCircle size={20} />}
      type="primary"
    >
      Approve
    </Button>
  );
};
export const DeleteButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title="Delete">
      <Button
        {...rest}
        color="red"
        className="text-red-500 flex gap-1 items-center font-medium px-1"
        type="link"
      >
        <MinusCircle size="20" />
      </Button>
    </Tooltip>
  );
};

export const DetailButton = ({
  color,
  ...rest
}: ButtonProps & { color?: string }) => {
  return (
    <Tooltip title="Detail">
      <Button
        {...rest}
        className="flex gap-1 items-center font-medium px-1"
        type="link"
      >
        <AiOutlineEye size={20} className={color ? color : " text-gray-700"} />
      </Button>
    </Tooltip>
  );
};

export const EditButton = ({ ...rest }: ButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        // type="primary"
        className=" flex gap-1 items-center font-medium px-3 py-1 text-[#475467]"
        type="link"
      >
        <Edit04 size="20" />
      </Button>
    </Tooltip>
  );
};

export const InActiveButton = ({
  tooltipTitle,
  ...rest
}: ButtonProps & {
  tooltipTitle?: string;
}) => {
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : "Cancel"}>
      <Button
        {...rest}
        color="red"
        className="text-red-500 flex items-center gap-1 font-medium px-1"
        type="link"
      >
        <MdOutlineClose size={20} />
      </Button>
    </Tooltip>
  );
};

export const CheckButton = ({
  tooltipTitle,
  ...rest
}: ButtonProps & {
  tooltipTitle?: string;
}) => {
  return (
    <Tooltip title={tooltipTitle ? tooltipTitle : "Approve"}>
      <Button
        {...rest}
        color="red"
        className=" flex items-center gap-1 font-medium px-1"
        type="link"
      >
        <MdOutlineCheckCircleOutline className="text-success-600" size={20} />
      </Button>
    </Tooltip>
  );
};

export const CloseButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      icon={<CloseOutlined className="text-white " size={20} rev={undefined} />}
      type="default"
      style={{
        backgroundColor: "#DD695C",
        borderColor: "#DD695C",
        color: "#fff",
      }}
    >
      {rest?.title}
    </Button>
  );
};
export const ConfirmButton = ({ ...rest }: ButtonProps) => {
  return (
    <Button
      {...rest}
      icon={<CheckOutlined className="text-white " size={20} rev={undefined} />}
      type="default"
      style={{
        backgroundColor: "#144E5A",
        borderColor: "#144E5A",
        color: "#fff",
      }}
    >
      {rest?.title}
    </Button>
  );
};

export const PermissionButton = ({ ...rest }) => {
  return (
    <Tooltip title="Permission">
      <Button
        {...rest}
        className="text-gray-700 flex items-center gap-1 font-medium px-1"
        type="link"
      >
        <RiUserSettingsLine size={20} />
      </Button>
    </Tooltip>
  );
};

interface CustomButtonProps extends ButtonProps {
  isDelete?: boolean;
  extraIcon?: React.ReactNode;
  disabled?: boolean;
}

export const CustomButton = ({ ...rest }: CustomButtonProps) => {
  return (
    <Tooltip title={rest.title}>
      <Button
        {...rest}
        disabled={rest.disabled}
        type="primary"
        className={`${
          rest?.isDelete && "bg-[#DD695C]"
        } flex items-center font-medium p-4`}
      >
        <div className="flex items-center gap-1">
          {rest?.title}
          {rest?.extraIcon}
        </div>
      </Button>
    </Tooltip>
  );
};
