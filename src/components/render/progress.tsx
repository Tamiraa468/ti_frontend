import { Progress, ProgressProps, Tooltip } from "antd";
import dayjs from "dayjs";
import { diffDates } from "utils/index";

type Props = ProgressProps & {
  days?: number | string;
  isDayDuration?: boolean;
  endDate?: Date;
  startDate?: Date;
  toolTipInfo?: string;
};
export const IProgress = ({
  days,
  startDate,
  endDate,
  isDayDuration,
  ...rest
}: Props) => {
  if (isDayDuration) {
    let totalDays = diffDates(endDate, startDate, "days");
    let currentDays = diffDates(dayjs().toDate(), startDate, "days");
    let isValid = totalDays > currentDays;
    let notStarted = dayjs(startDate).isAfter(dayjs());
    return (
      <IProgress
        percent={
          notStarted
            ? 100
            : isValid
            ? ((totalDays - currentDays) * 100) / totalDays
            : 0
        }
        days={notStarted ? 100 : isValid ? totalDays - currentDays : 0}
      />
    );
  }
  return (
    <Tooltip title={rest.toolTipInfo} color="#0077F4">
      <div className="flex items-center gap-2">
        <Progress
          {...rest}
          strokeColor={"#0077F4"}
          showInfo={false}
          className="w-[100px]"
        />
        <div className="text-gray-700 font-medium">{days ?? 0}</div>
      </div>
    </Tooltip>
  );
};
