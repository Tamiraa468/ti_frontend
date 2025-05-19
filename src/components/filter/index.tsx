import ProForm, {
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormProps,
  ProFormRadio,
} from "@ant-design/pro-form";
import { Button, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { FilterDeadline, FilterFormButton } from "types";
import { FilterLines } from "untitledui-js-base";
import { calculateDeadlineDate } from "utils/index";

type Props = ProFormProps & {
  customHeadFilters?: React.ReactNode;
  others?: React.ReactNode;
  customState?: React.ReactNode;
  hideFilters?: boolean;
  showGroupButton?: boolean;
  hideDatePicker?: boolean;
  selectedDate?: string;
  setSelectedDate?: Function;
};
export const FilterForm = ({
  showGroupButton = true,
  customHeadFilters,
  initialValues,
  others,
  hideFilters,
  customState,
  hideDatePicker = false,
  ...rest
}: Props) => {
  const [isCustomDate, setCustomDate] = useState(false);

  const [isSelectedDate, setIsSelectedDate] = useState(false);

  const buttons: FilterFormButton[] = [
    {
      value: FilterDeadline.FullHours,
      label: "24 цаг",
      onChange: () => setIsSelectedDate(false),
    },
    {
      value: FilterDeadline.Week,
      label: "7 хоног",
      onChange: () => setIsSelectedDate(false),
    },
    {
      value: FilterDeadline.Month,
      label: "30 хоног",
      onChange: () => setIsSelectedDate(false),
    },
    {
      value: FilterDeadline.ThreeMonth,
      label: "3 сар",
      onChange: () => setIsSelectedDate(false),
    },
    {
      value: FilterDeadline.SixMonth,
      label: "6 сар",
      onChange: () => setIsSelectedDate(false),
    },
    {
      value: FilterDeadline.Year,
      label: "1 жил",
      onChange: () => setIsSelectedDate(false),
    },
    {
      value: FilterDeadline.All,
      label: "Сонгох",
      onChange: (e) => {
        setCustomDate(true);
      },
    },
  ];

  const form = useRef<ProFormInstance>();

  useEffect(() => {
    form.current?.setFieldsValue({ ...initialValues });
    if (initialValues?.deadline) {
      setCustomDate(false);
    }
  }, [initialValues, isCustomDate]);

  const content = (
    <ProForm
      {...rest}
      formRef={form}
      layout="inline"
      submitter={false}
      className="space-y-2 flex items-center justify-between flex-wrap"
    >
      <div className="flex items-center flex-wrap gap-2 md:gap-0">
        {customHeadFilters}
        {hideFilters ? null : (
          <div className="gap-2 custom-ant-radio-button relative ">
            <ProFormRadio.Group
              hidden={!showGroupButton}
              name={"deadline"}
              radioType="button"
              fieldProps={{
                onChange: (e) => {
                  setIsSelectedDate(false);
                  rest.setSelectedDate?.({
                    ...initialValues,
                    sortDate: {
                      start_day: calculateDeadlineDate(e.target.value)?.map(
                        (el) => el.format("YYYY-MM-DD")
                      )[0],
                      end_day: calculateDeadlineDate(e.target.value)?.map(
                        (el) => el.format("YYYY-MM-DD")
                      )[1],
                    },
                  });
                },
                size: "large",
              }}
              options={buttons?.map((el) => ({ ...el }))}
              initialValue={FilterDeadline.Month}
            />
            <div
              className={`absolute ${
                isSelectedDate ? "-right-[223px]" : "right-0"
              } top-[1px] z-10 cursor-pointer h-10`}
            >
              <div
                className={`custom-ant-date-range-picker ${
                  isSelectedDate
                    ? "w-80 opacity-100 -mt-[1px] -mr-4 md:mr-0 animate-scaleX"
                    : "opacity-0 ml-0 mr-0 w-24"
                } `}
              >
                <ProFormDateRangePicker
                  name="full_date"
                  className="text-gray-700 cursor-pointer m-0  ant-layot-picker"
                  allowClear={false}
                  hidden={hideDatePicker}
                  fieldProps={{
                    size: "large",
                    className: "text-sm m-0",
                    suffixIcon: (
                      <FiCalendar className="text-gray-700 text-xl" />
                    ),
                    onChange(_, formatString) {
                      if (formatString.length === 2) {
                        setIsSelectedDate(true);
                      }
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {others}
      </div>
      <div className="flex items-center flex-wrap gap-2">{customState}</div>
    </ProForm>
  );

  return (
    <>
      <div className="hidden md:block">{content}</div>
      <div className="md:hidden block">
        <PopoverFilter children={content} />
      </div>
    </>
  );
};

export const PopoverFilter = ({ children }: { children: any }) => {
  return (
    <Popover
      placement="bottomLeft"
      arrow={false}
      content={<div className="p-3 w-80 min-[350]">{children}</div>}
    >
      <Button size="large" icon={<FilterLines />} />
    </Popover>
  );
};
