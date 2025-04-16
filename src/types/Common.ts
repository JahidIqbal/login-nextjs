import { ReactNode } from "react";

export interface LabelAndValue<T = string> {
  label: string;
  value: T;
}

export interface IdAndName {
  id: number;
  name: string;
}

export type ChildrenProp = Readonly<{
  children: ReactNode;
}>;

export interface Range<T = number> {
  min: T;
  max: T;
}

export interface Duration {
  type: "seconds" | "minutes" | "hours";
  value: number;
}

export type SelectedLabelAndValue = LabelAndValue & { isSelected: boolean };

export interface Pagination {
  totalcount: number,
  currentpage: number,
  currentpagetotalcount: number,
  hasnext: boolean
}

export interface PageProp {
  searchParams?: Promise<{
    page?: number;
  }>;
}

export interface RangeInUrl<T = string> {
  start?: T;
  end?: T;
}

export interface DateRangeProp {
  searchParams?: Promise<RangeInUrl>;
}

export interface IdProps {
  params: Promise<{ id: number }>;
}

export type ColorCode = `#${string}`;

export type NextUiColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | any |undefined;

export type NextUiColorMap<T extends string | number | symbol> = {[k in T]: NextUiColor}

export type StringKeys<T> = Extract<Partial<keyof T>, string>;

export interface MessageResponse {
  message: string;
}