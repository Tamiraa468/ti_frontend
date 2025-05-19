import { RadioChangeEvent } from "antd";

export interface FilterFormButton {
  value: FilterDeadline;
  label: string;
  onChange?: (e: RadioChangeEvent) => void;
}

export type Locale = "mn" | "en";

export interface ActionComponentProps<T> {
  open: boolean;
  onCancel: () => void;
  onFinish?: () => void;
  detail?: T;
  details?: T[];
}
export interface RemoveModelConfig<T> {
  action?: (id: number) => Promise<SuccessResponse>;
  config: (record?: T) => {
    uniqueKey?: number;
    display: React.ReactNode;
    title?: string;
    body?: any;
    cancelTitle?: string;
    customTitle?: string;
  };
}
export enum FilterDeadline {
  All,
  FullHours, // "one_day",
  Week, // "seven_day",
  Month, // "thirty_day",
  OneMonth, // month
  ThreeMonth, // "three_months" ,
  SixMonth, // "six_months",
  Year, // "year"
}

export enum Week {
  Monday = "mon",
  Tuesday = "tue",
  Wednesday = "wed",
  Thursday = "thu",
  Friday = "fri",
  Saturday = "sat",
  Sunday = "sun",
}

export interface AntdFile {
  uid: string;
  name?: string;
  status: string;
  response: string;
  url: any;
  originFileObj?: File;
}

export interface StringInterface {
  [x: string]: string;
}

export interface AnyInterface {
  [x: string]: any;
}

export type Optional<T> = T | undefined | null;

export interface DeleteConfirm {
  confirm: string;
}

export interface BaseResponse<T> {
  message: string;
  body: T;
}

export interface PaginationResponse<T> {
  total: number;
  items: Array<T>;
}

export interface SearchResponse<T> {
  has_next: boolean;
  items: Array<T>;
}

export interface PaginationRequest {
  limit?: number;
  page?: number;
  sorter?: Optional<Object>;
  is_all?: boolean;
}
export interface BaseFilter {
  deleted_at?: string[];
  created_at?: string[];
  updated_at?: string[];
}
export interface BaseModifierFilter {
  creator_id?: number;
  modifier_id?: number;
}

export type SuccessResponse = { success: boolean };

export const IsBoolEnum = {
  "1": {
    text: "Тийм",
  },
  "0": {
    text: "Үгүй",
  },
};

export const ActiveBool = {
  "0": {
    text: "Идэвхгүй",
  },
  "1": {
    text: "Идэвхтэй",
  },
};

export const LocaleEnum = {
  mn: {
    text: "Монгол",
  },
  en: {
    text: "Ангил",
  },
};

export const IsPaidBool = {
  "0": {
    text: "Төлөөгүй",
  },
  "1": {
    text: "Төлсөн",
  },
};

export const PublicBool = {
  "0": {
    text: "Бүртгэлтэй хэрэглэгчид",
  },
  "1": {
    text: "Нийтэд",
  },
};

export const DefaultPagination = {
  showSizeChanger: true,
  size: "small",
  pageSizeOptions: [20, 100, 500, 1000, 5000, 10000, 50000],
};
