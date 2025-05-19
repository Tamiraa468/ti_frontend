import { Admin } from "service/auth/type";

export interface DataType {
  authorized?: boolean;
  user?: Admin;
  init?: boolean;
}
export enum Action {
  SIGN_OUT = "SIGN_OUT",
  SIGN_IN = "SIGN_IN",
  INIT = "INIT",
}
export type ReducerType = (state: DataType, action: Actions) => DataType;

export type Actions =
  | [Action.SIGN_OUT]
  | [Action.SIGN_IN, Admin]
  | [Action.INIT, boolean];

export type Refreshs = {
  info: () => void;
};
export type AuthContextType = [DataType, (action: Actions) => void];
export type AuthReducerType = (state: DataType, action: Actions) => DataType;

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}
