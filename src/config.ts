import { Rule } from "antd/lib/form";

export const deleteConfirm = "delete me";
export const deleteConfirmReg = /^delete me$/g;
export const FieldRequireMessage = "Энэ талбарыг оруулах шаардлагатай!";

export const FORM_ITEM_RULE: (value?: any) => Rule[] = (value?: any) => [
  { message: FieldRequireMessage, required: true, ...value },
];
// Service
export enum GenderType {
  male = "Эрэгтэй",
  female = "Эмэгтэй",
}

export enum PaymentType {
  cash = "cash",
  non_cash = "non_cash",
}

export const workersGenderArray = Object.freeze([
  {
    label: "Эрэгтэй",
    value: GenderType.male,
  },
  {
    label: "Эмэгтэй",
    value: GenderType.female,
  },
]);

export const unitTonnArray = Object.freeze([
  {
    label: "20 Тонн",
    value: 20,
  },
  {
    label: "40 Тонн",
    value: 40,
  },
]);

export enum UserRoleType {
  admin = "admin",
  transport_manager = "transport_manager",
  financier = "financier",
  cashier = "cashier",
  customer = "customer_company",
}

export const permissionArray = Object.freeze([
  UserRoleType.admin,
  UserRoleType.transport_manager,
  UserRoleType.financier,
  UserRoleType.cashier,
]);

export const permissionArraySuperAdmin = Object.freeze([
  UserRoleType.admin,
  UserRoleType.transport_manager,
  UserRoleType.financier,
  UserRoleType.cashier,
]);

export enum DevPlanQuistions {
  TreatInteract = "TreatInteract",
  LifePride = "LifePride",
  LifeValue = "LifeValue",
  PriorityService = "PriorityService",
}

export enum FieldRegistrationTab {
  CargoApproach = "cargo_approach",
  Remainder = "remainder",
  ArrivalField = "arrival_field",
}

export enum FininciarTab {
  CustomerCompany = 0,
  AdditionalFeeSettings = 1,
  CustomerAccountSettlement = 2,
  CancellingTicket = 3,
  CategoryType = 4,
  ForeignCustomer = 5,
}

export enum registerCustomerEnumTab {
  Worker = "worker",
  CustomerCompany = "customer_company",
}

export interface FininciarTabtButton {
  value: FininciarTab;
  label: string;
}

export interface FieldRegistrationTabtButton {
  value: registerCustomerEnumTab;
  label: string;
}

export enum CustomerAccountSettlementTab {
  ledger = "ledger",
  transaction = "transaction",
}

export enum DetailTab {
  container = "container",
  grant = "grant",
  shipping = "shipping",
}

export enum transictionTypeEnum {
  all = "",
  // debit = "debit",
  // credit = "credit",
}

export interface CustomerAccountSettlementTabtButton {
  value: CustomerAccountSettlementTab;
  label: string;
}

export interface DetailTabtButton {
  value: any;
  label: string;
}

export enum DirectionType {
  south = "south",
  north = "north",
}

export enum CategoryTypeEnum {
  assignation = "assignation",
  shipping = "shipping",
}
