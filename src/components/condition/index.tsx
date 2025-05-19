import { PageLoading } from "@ant-design/pro-layout";
import React from "react";

type Props = {
  condition: boolean;
  whenTrue?: any;
  whenFalse?: any;
  data?:any
};
export const IfCondition = ({ condition, whenTrue, whenFalse}: Props) => {
  if (condition) return <>{whenTrue}</>;
  if (!condition && !!whenFalse) return <>{whenFalse}</>;
  return <></>;
};
type PropsPageLoad = {
  condition: boolean;
  children?: React.ReactNode;
};
export const IfDataCondition = ({ condition, whenTrue, whenFalse,data }: Props) => {
  if (condition && data) return <>{whenTrue}</>;
  if (!condition && !!whenFalse) return <>{whenFalse}</>;
  return <></>;
};
export const IfPageLoad = ({ condition, children }: PropsPageLoad) => {
  return condition ? <PageLoading /> : { children };
};
