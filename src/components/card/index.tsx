import { Card, Progress, Skeleton } from "antd";
import BackIcon from "assets/img/icon-back.svg";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";

interface CustomCardProps {
  title: ReactNode | string;
  children: ReactNode;
  rightTop?: ReactNode;
  subTitle?: string;
  className?: string;
  small?: boolean;
  fixedHeightTitle?: boolean;
  loading?: boolean;
  bodyClassName?: string;
}

export const CustomCard = ({
  title,
  children,
  rightTop,
  subTitle,
  className,
  small,
  fixedHeightTitle,
  loading,
  bodyClassName,
}: CustomCardProps) => {
  return (
    <div
      className={`p-4 rounded-xl bg-[#FFF] border border-[#D0D5DD] space-y-4 ${
        small ? "p-4" : "p-8"
      } ${className} `}
      style={{
        border: "1px solid #D0D5DD",
      }}
    >
      <div className="flex items-start justify-between gap-4 md:flex-row flex-col">
        <div
          style={{
            height: fixedHeightTitle ? "10px !important" : "auto",
          }}
        >
          <p
            className={`font-semibold  text-[#344054] ${
              small ? "text-base" : "text-lg"
            }`}
          >
            {title}
          </p>
          <p className="  text-sm text-[#475467]">{subTitle}</p>
        </div>
        {rightTop}
      </div>
      <Skeleton loading={loading} active>
        <div className={`w-full h-full ${bodyClassName}`}>{children}</div>
      </Skeleton>
    </div>
  );
};

interface ArrowCardProps {
  title: string;

  number?: number;
  href?: string;
  loading?: boolean;
}
export const ArrowCard = ({ title, number, href, loading }: ArrowCardProps) => {
  return (
    <Skeleton loading={loading} active>
      <div
        className="p-4 rounded-xl bg-white border border-[#D0D5DD] group"
        style={{
          border: "1px solid #D0D5DD",
        }}
      >
        <h1 className=" font-semibold text-base text-[#101828]">{title}</h1>
        <div className=" w-full flex justify-between items-center text-3xl text-[#0077F4]">
          <div>
            <p className="font-semibold ">{number}</p>
          </div>
          <div>
            <FaArrowRight
              color="#0077F4"
              size={18}
              className=" group-hover:translate-x-1 translate-x-0 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

interface WhiteCardProps {
  title: string;
  children: ReactNode;
  loading?: boolean;
  secondTitle?: React.ReactNode | string;
}
export const WhiteCard = ({
  title,
  children,
  loading,
  secondTitle,
}: WhiteCardProps) => {
  return (
    <Skeleton loading={loading} active>
      <div
        className="p-4 rounded-xl bg-white border border-[#D0D5DD] group flex flex-col justify-between gap-4"
        style={{
          border: "1px solid #D0D5DD",
        }}
      >
        <div className="flex items-center justify-between h-7">
          <p
            className={`font-semibold ${
              title.length <= 25 ? "text-base" : "text-sm"
            } text-[#101828]`}
          >
            {title}
          </p>
          <p className=" font-semibold text-base text-[#101828] flex items-center">
            {secondTitle}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </Skeleton>
  );
};

type PageCardProps = {
  children: ReactNode;
  className?: string;
  xR?: boolean;
  yR?: boolean;
  title?: string;
  extra?: ReactNode;
  bodyClassName?: string;
  titleClassName?: string;
  loading?: boolean;
  paddingRemove?: boolean;
};
export const PageCard = ({
  children,
  className,
  xR,
  yR,
  title,
  extra,
  bodyClassName,
  titleClassName,
  loading,
  paddingRemove,
}: PageCardProps) => {
  return (
    <Card
      loading={loading}
      bodyStyle={{ padding: 0 }}
      headStyle={{ display: "none" }}
      className={`${paddingRemove ? "p-0" : "p-4"} ${xR && "px-0"} ${
        yR && "py-0"
      } ${className}`}
      bordered={false}
    >
      <div className={` ${bodyClassName} `}>
        <div className={`flex items-center justify-between ${titleClassName}`}>
          <div className="font-bold text-base text-scale-700">{title}</div>
          {extra}
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
};

type ICardProps = {
  children: ReactNode;
  className?: string;
  xR?: boolean;
  yR?: boolean;
  title?: string;
  extra?: ReactNode;
  bodyClassName?: string;
  titleClassName?: string;
  loading?: boolean;
  paddingRemove?: boolean;
};
export const ICard = ({
  children,
  className,
  xR,
  yR,
  title,
  extra,
  bodyClassName,
  titleClassName,
  loading,
  paddingRemove,
}: ICardProps) => {
  return (
    <Card
      loading={loading}
      bodyStyle={{ padding: 0 }}
      headStyle={{ display: "none" }}
      className={`${paddingRemove ? "p-0" : "p-4"} ${xR && "px-0"} ${
        yR && "py-0"
      } ${className} h-full`}
      bordered={false}
    >
      <div className={` ${bodyClassName} `}>
        <div className={`flex items-center justify-between ${titleClassName}`}>
          <div className="font-bold text-base text-scale-700">{title}</div>
          {extra}
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card className="bg-[#E7EDEE] w-full h-[120px]">
    <div className="flex flex-col gap-1">
      <div className="text-sm text-[#101828] font-semibold">{title}</div>
      <div>
        <div className="text-[36px] font-semibold">{value}</div>
      </div>
    </div>
  </Card>
);

interface ProgressCardProps {
  title: string;
  value: number;
  number?: number;
  onClick?: () => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  number,
  onClick,
}) => {
  let textColor = "#144E5A";
  let percentPoint = 5;
  switch (number) {
    case 1:
      textColor = "#144E5A";
      percentPoint = 5;
      break;
    case 2:
      textColor = "#F79009";
      percentPoint = 20;
      break;
    case 3:
      textColor = "#F04438";
      percentPoint = 5;
      break;
    default:
      percentPoint = 5;
      textColor = "#144E5A";
  }

  return (
    <Card className="w-full card-header-remove h-[144px]" bordered>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-xl text-gray-800 mr-3">{title}</div>
          <img
            src={BackIcon}
            alt="back"
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col ">
          <div className="flex gap-2 items-center m-0 p-0">
            <p className="text-sm font-normal text-gray-500 m-0 p-0">Оноо</p>
            <p className="text-base font-medium text-gray-800 m-0 p-0">{`${value}/${percentPoint}`}</p>
          </div>
          <Progress
            showInfo={false}
            percent={(value * 100) / percentPoint}
            size={["100%", 10]}
            strokeColor={textColor}
            className="m-0"
          />
        </div>
      </div>
    </Card>
  );
};

interface FamilyPicProps {
  title: string;
  value: number;
  number?: number;
  onClick?: () => void;
}

export const FamilyPicCard: React.FC<FamilyPicProps> = ({
  title,
  value,
  number,
  onClick,
}) => {
  let textColor = "#144E5A";
  let percentPoint = 5;
  switch (number) {
    case 1:
      textColor = "#144E5A";
      percentPoint = 5;
      break;
    case 2:
      textColor = "#F79009";
      percentPoint = 20;
      break;
    case 3:
      textColor = "#F04438";
      percentPoint = 5;
      break;
    default:
      percentPoint = 5;
      textColor = "#144E5A";
  }

  return (
    <Card className="w-full card-header-remove h-[144px]" bordered>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-xl text-gray-800">{title}</div>
          <img
            src={BackIcon}
            alt="back"
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};
