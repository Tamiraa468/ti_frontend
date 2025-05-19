import { UserRoleType } from "config";
import dayjs, { QUnitType } from "dayjs";
import {
  menuCashierItems,
  menuCustomerItems,
  menuFininciarItems,
  menuItems,
  menuManagerItems,
} from "layout/dashboard/menu_items";
import file from "service/file";
import { FilterDeadline } from "types";

export interface ISorter {
  //method to list all the keys of the object
  toList: () => SortOption[];
}

export interface SortOption {
  selector: string;
  direction: "asc" | "desc";
}

export interface DataLoadRequest {
  pageNumber?: number;
  pageSize?: number;
  orders?: Array<SortOption>;
}

export const moneyFormat: (
  money?: number | null,
  currency?: string
) => string = (money, currency) => {
  if (!money) return "0";
  let format = new Intl.NumberFormat().format(money);
  if (currency) return `${format} ${currency === "mnt" ? "₮" : "$"}`;
  return format;
};

export const generateUniqueID = () => new Date().getTime().toString();

export const convertFileToUploadFile = (path?: string): any[] | undefined =>
  path
    ? [
        {
          uid: path,
          status: "done",
          response: "",
          url: file.fileToUrl(path),
          name: path,
          isBefore: true,
        },
      ]
    : undefined;

export const calculateDeadlineDate = (deadline: FilterDeadline) => {
  switch (deadline) {
    case FilterDeadline.FullHours:
      return [dayjs().add(-1, "day"), dayjs()];
    case FilterDeadline.Week:
      return [dayjs().add(-1, "week"), dayjs()];
    case FilterDeadline.Month:
      return [dayjs().add(-30, "day"), dayjs()];
    case FilterDeadline.ThreeMonth:
      return [dayjs().add(-2, "month"), dayjs()];
    case FilterDeadline.SixMonth:
      return [dayjs().add(-5, "month"), dayjs()];
    case FilterDeadline.Year:
      return [dayjs().add(-1, "year"), dayjs()];
    case FilterDeadline.OneMonth:
      return [dayjs().add(-1, "month"), dayjs()];

    default:
      return undefined;
  }
};

export const diffDates = (start?: Date, end?: Date, field?: QUnitType) => {
  return dayjs(start).diff(end, field);
};

/*************  ✨ Codeium Command 🌟  *************/

export const formatNumber = (value?: number) => {
  // Return the formatted value with the appropriate unit (B, KB, MB, etc.)
  if (!value) return 0;
  if (value < 1000) return value.toFixed(1);
  if (value > 1000 && value < 1000000) {
    /**
     * Format a number of bytes as a human-readable string
     * @param value - The value to format
     * @param decimals - The number of decimal places to round to
     * @returns The formatted string
     */
    return (value / 1000).toFixed(1) + "K";
    /******  8c3ee646-1364-4211-9401-1461885a92af  *******/
  }
  if (value > 1000000 && value < 1000000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value > 1000000000 && value < 1000000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  }
  return value.toFixed(1);
};

export const formatKB = (value: number, decimals = 1) => {
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (value === 0) return "0";
  const k: number = 1024;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const tmp = k ** i;
  const dm = decimals < 0 ? 0 : decimals;
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`;
};

export const formatMB = (value = 0, decimals = 2) => {
  const sizes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (value === 0) return "0";
  const k: number = 1024;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const tmp = k ** i;
  const dm = decimals < 0 ? 0 : decimals;
  return `${parseFloat((value / tmp).toFixed(dm))} ${sizes[i]}`;
};

export const newFileUploads = async (files: any[], uploadMulti: any) => {
  const oldFileIDs: number[] = [];

  files.map((file) => {
    if (!file?.uid.includes("rc-upload")) {
      oldFileIDs.push(parseInt(file.uid));
    }
  });

  const ids = await uploadMulti
    .runAsync({
      names: files?.reduce<string[]>((acc, record) => {
        if (record?.uid.includes("rc-upload")) {
          acc.push(record.fileName || "");
          return acc;
        }
        return acc;
      }, []),
      files: files?.reduce<string[]>((acc, record) => {
        if (record?.uid.includes("rc-upload")) {
          acc.push(record);
          return acc;
        }
        return acc;
      }, []),
    })
    .then((el: any) => el.map((el: any) => el.id));

  return oldFileIDs.concat(ids);
};

export const initFilter = {
  current: 1,
  pageSize: 10,
  sortDate: {
    start_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[0],
    end_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
      el.format("YYYY-MM-DD")
    )[1],
  },
};
export const initPagination = {
  current: 0,
  pageSize: 20,
};

export const EmployePagination = {
  current: 0,
  pageSize: 20,
  is_user: true,
};

export const cargoApproachPaginate = {
  current: 0,
  pageSize: 20,
  direction: null,
  status: "created",
  between: [
    dayjs().subtract(3, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ],
};

export const fieldRegistrationPaginate = {
  current: 0,
  pageSize: 20,
  direction: null,
  status: "arrived_at_site",
  between: [
    dayjs().subtract(3, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ],
};

export const myFillPaginate = {
  current: 0,
  pageSize: 20,
  status: "arrived_at_site",
  between: [
    dayjs().subtract(3, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ],
  customer_company_id: null,
};

export const reportPaginate = {
  current: 0,
  pageSize: 20,
  start_date: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
  end_date: dayjs().format("YYYY-MM-DD"),
  additional_fee_category_id: null,
};

export const reminderFilter = {
  current: 1,
  pageSize: 20,
  levels: ["level_2", "level_3"],
  filter_type: "comp_ass",
  start_date: dayjs().startOf("month"),
  end_date: dayjs().endOf("month"),
};

export const settingsFilter = {
  current: 1,
  pageSize: 20,
  start_date: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
  end_date: dayjs().format("YYYY-MM-DD"),
};

export const myPlanedFilter = {
  current: 1,
  pageSize: 20,
  start_date: dayjs().startOf("month"),
  end_date: dayjs().endOf("month"),
  filter_type: "comp_ass",
};

export const reportFilterYear = {
  current: 1,
  pageSize: 20,
  year: dayjs().year(),
};

export const reportStatisticalFilterLevel = {
  current: 1,
  pageSize: 20,
  year: dayjs().year(),
  report_type: "level",
};

export const reportStatisticalFilterAge = {
  current: 1,
  pageSize: 20,
  year: dayjs().year(),
  report_type: "age",
};

export const parseMongolianID = (id: any) => {
  const yearPart = id?.slice(2, 4);
  const monthPart = id?.slice(4, 6);
  const dayPart = id?.slice(6, 8);
  const year = parseInt(yearPart, 10);
  let month = parseInt(monthPart, 10);
  const day = parseInt(dayPart, 10);

  let fullYear;
  if (month > 12) {
    fullYear = year + 2000;
    month -= 20;
  } else {
    fullYear = year + 1900;
  }

  const date = new Date(fullYear, month - 1, day);

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();

  return age || 0;
};

export const parseMongolianGender = (id: any) => {
  const secondToLastChar = id.charAt(id.length - 2);
  const isOdd = parseInt(secondToLastChar) % 2 === 0;
  const gender = isOdd ? "female" : "male";
  return gender;
};

export const chooseDate = (date: String) => {
  switch (date) {
    case "today":
      return [dayjs().startOf("day"), dayjs().endOf("day")];
    case "tommorow":
      return [
        dayjs().add(1, "day").startOf("day"),
        dayjs().add(1, "day").endOf("day"),
      ];
    case "this_week":
      return [
        dayjs().startOf("week"), // Start of current week
        dayjs().endOf("week"), // End of current week
      ];
    case "next_week":
      return [
        dayjs().add(1, "week").startOf("week"), // Start of next week
        dayjs().add(1, "week").endOf("week"),
      ];
    case "this_month":
      return [dayjs().startOf("month"), dayjs().endOf("month")];
    case "next_month":
      return [
        dayjs().add(1, "month").startOf("month"),
        dayjs().add(1, "month").endOf("month"),
      ];
    case "this_year":
      return [dayjs().startOf("year"), dayjs().endOf("year")];
    case "next_year":
      return [
        dayjs().add(1, "year").startOf("year"),
        dayjs().add(1, "year").endOf("year"),
      ];
    default:
      return [dayjs().startOf("day"), dayjs().endOf("day")];
  }
};

export const getBase64ImageFromURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
};

export const ledgerFilter = {
  current: 0,
  pageSize: 20,
  sorter: {
    created_at: "desc",
  },
};

export const transictionFilter = {
  current: 0,
  transaction_type: "",
  pageSize: 20,
  customer_company_id: null,
  between: [
    dayjs().subtract(3, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ],
  sorter: {
    created_at: "desc",
  },
};

export const getNavigateRoute = (role: string) => {
  switch (role) {
    case UserRoleType.admin:
      return menuItems[0].path;
    case UserRoleType.transport_manager:
      return menuManagerItems[0].path;
    case UserRoleType.cashier:
      return menuCashierItems[0].path;
    case UserRoleType.financier:
      return menuFininciarItems[0].path;
    case UserRoleType.customer:
      return menuCustomerItems[0].path;
    default:
      return menuManagerItems[0].path;
  }
};
