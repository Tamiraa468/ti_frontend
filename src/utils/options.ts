import { DirectionType } from "config";

export const PaymentMethod = Object.freeze([
  {
    value: "cash",
    label: "Бэлэн",
  },
  {
    value: "non_cash",
    label: "Бэлэн бус",
  },
]);

export const ManagerPaymentMethod = Object.freeze([
  {
    value: "prepaid",
    label: "Prepaid",
  },
  {
    value: "collect",
    label: "Collect",
  },
]);

export const ArrilvelFieldPaymentMethod = Object.freeze([
  {
    value: "cash",
    label: "Бэлэн",
  },
  {
    value: "non_cash",
    label: "Бэлэн бус",
  },
  {
    value: "prepaid",
    label: "Prepaid",
  },
  {
    value: "collect",
    label: "Collect",
  },
]);

export const CapacityOptions = Object.freeze([
  {
    value: "3",
    label: "3",
  },
  {
    value: "20tn",
    label: "20тн",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "40tn",
    label: "40тн",
  },
  {
    value: "44",
    label: "44",
  },
  {
    value: "tir",
    label: "Тир",
  },
  {
    value: "waggon",
    label: "Вагон",
  },
]);

export const CreateCapacityOptions = Object.freeze([
  {
    value: "3",
    label: "3",
  },
  {
    value: "20tn",
    label: "20тн / 22",
  },
  {
    value: "40tn",
    label: "40тн / 44",
  },
  {
    value: "tir",
    label: "Тир",
  },
  {
    value: "waggon",
    label: "Вагон",
  },
]);

export const CurrencyOptions = Object.freeze([
  {
    value: "mnt",
    label: "MNT",
  },
  {
    value: "usd",
    label: "USD",
  },
  {
    value: "cny",
    label: "CNY",
  },
  {
    value: "rub",
    label: "RUB",
  },
  {
    value: "eur",
    label: "EUR",
  },
  {
    value: "jpy",
    label: "JPY",
  },
]);

export const DirectionOptions = Object.freeze([
  {
    label: "Урд",
    value: DirectionType.south,
  },
  {
    label: "Хойд",
    value: DirectionType.north,
  },
]);

export const DirectionSelect = Object.freeze([
  {
    label: "Бүгд",
    value: null,
  },
  {
    label: "Замын-үүд",
    value: DirectionType.south,
  },
  {
    label: "Cүхбаатар",
    value: DirectionType.north,
  },
]);
