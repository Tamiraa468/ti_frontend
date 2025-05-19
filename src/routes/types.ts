import { ComponentClass, FC } from "react";

export type RC = FC | ComponentClass;

export type Factory = Promise<{ default: RC }>;

export interface IRoute {
  key?: string;
  path?: string;
  component: any;
  children?: IRoute[];
}
