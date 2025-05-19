import {
  Archive,
  File03,
  PieChart02,
  Settings01,
  User01,
  Wallet01,
} from "untitledui-js-base";

export const menuItems = [
  {
    icon: <User01 />,
    name: "Хэрэглэгчдийн бүртгэл",
    path: "/dashboard/employ-registration",
  },
];

export const menuManagerItems = [
  {
    icon: <Archive />,
    name: "Талбайн бүртгэл",
    path: "/dashboard/field-registration",
  },
];

export const menuCustomerItems = [
  {
    icon: <PieChart02 />,
    name: "Талбайн тооцоо",
    path: "/dashboard/my-fill",
  },
  {
    icon: <Wallet01 />,
    name: "Дансны бүртгэл",
    path: "/dashboard/my-wallet",
  },
];

export const menuCashierItems = [
  {
    icon: <Archive />,
    name: "Талбайн бүртгэл",
    path: "/dashboard/field-registration",
  },
  {
    icon: <PieChart02 />,
    name: "Лавлах мэдээлэл",
    path: "/dashboard/customer-account-settlement",
  },
  {
    icon: <File03 />,
    name: "Тайлан",
    path: "/dashboard/report",
  },
];

export const menuSuperAdminItems = [
  {
    icon: <PieChart02 />,
    name: "Хяналтын самбар",
    path: "/dashboard/dashboard",
  },
  {
    icon: <File03 />,
    name: "Статистик тайлан",
    path: "/dashboard/stastical-report",
  },
  {
    icon: <Settings01 />,
    name: "Тохиргоо",
    path: "/dashboard/settings",
  },
];

export const menuAdminItems = [
  ...menuItems,
  {
    icon: <Settings01 />,
    name: "Тохиргоо",
    path: "/dashboard/settings",
  },
];

export const menuFininciarItems = [
  {
    icon: <Archive />,
    name: "Талбайн бүртгэл",
    path: "/dashboard/field-registration",
  },
  {
    icon: <PieChart02 />,
    name: "Лавлах мэдээлэл",
    path: "/dashboard/financiar",
  },
  {
    icon: <File03 />,
    name: "Статистик тайлан",
    path: "/dashboard/report",
  },
];
