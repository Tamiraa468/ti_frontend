import { ReactNode } from "react";

export interface MarkerRecord {
  name: string;
  latitude: number;
  longitude: number;
  color?: MarkerColors;
  onClick?: Function;
  customPopup?: ReactNode;
}
export type MarkerColors = "red" | "blue" | "green";
